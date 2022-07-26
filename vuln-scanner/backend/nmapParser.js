const fs = require('fs');
const getCVE = require('./getCVE')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { XMLParser } = require('fast-xml-parser');


// Command execution //
async function execCode(scanId, scanTarget, db) {

    const cmd = `nmap -v -T5 -sS -p- -sV 9 -PR -O -oX ${scanId}-res.xml ${scanTarget}`;
    const { nmapStdout, nmapStderr } = await exec(cmd);

    fs.readFile(`./${scanId}-res.xml`, 'utf8', (err, data) => {
        const options = {
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        };
        const parser = new XMLParser(options);
        let jsonObj = parser.parse(data);

        fs.writeFile(`./${scanId}-res.json`, JSON.stringify(jsonObj), err => {
            if (err) {
                console.error(err);
            }
            json2db(scanId, db);
            // file written successfully
        });
    });
}

// Parsing JSON to DB //
function json2db(scanId, db) {
    let scanDatetime = new Date();
    db.query("UPDATE Scans SET scan_end_date = ? WHERE scan_id = ?", [scanDatetime.toISOString().split(".")[0], scanId], (error) => {
        // If there is an issue with the query, output the error
        if (error) throw error;
    });
    fs.readFile(`${scanId}-res.json`, async (err, data) => {
        if (err) throw err;
        
        let result = JSON.parse(data);
        let target = result.nmaprun.host
        for (let i = 0; i < target.length; i++) {
           
            let stat = target[i].status['@_state'];
            if (stat === 'up') {
                let addrIp = "None";
                let addrMac = "None";
                let hostName = "None";
                let host_os = 'None';
                if (Array.isArray(target[i].address)) {
                    for (const [key, knownAddr] of Object.entries(target[i].address)) {
                        switch (knownAddr['@_addrtype']) {
                            case 'ipv4':
                                addrIp = knownAddr['@_addr'];
                                break;
                            case 'mac':
                                addrMac = knownAddr['@_addr'];
                                break;
                            default:
                        }
                    }
                } else {
                    addrIp = target[i].address['@_addr'];
                }

                if (target[i].hostnames !== undefined && target[i].hostnames.hostname !== undefined) {
                    hostName = target[i].hostnames.hostname['@_name']
                }

                if (target[i].os !== undefined) {
                    host_os = target[i].os.osmatch['@_name'];
                    host_os = host_os.split(' ');
                    host_os = host_os[0];
                }

                db.query('INSERT INTO Hosts (host_name, host_ip, host_os, host_mac, host_status, scan_id) VALUES (?, ?, ?, ?, ?, ?)', [hostName, addrIp, host_os, addrMac, stat, scanId], (error, result) => {
                    if (error) throw error


                    if (target[i].ports !== undefined) {
                        const host_id = result.insertId
                        for (let x = 0; x < target[i].ports.port.length; x++) {

                            if (target[i].ports.port[x].service !== undefined) {
                                let service_product = target[i].ports.port[x].service['@_product'] === undefined ? "" : target[i].ports.port[x].service['@_product'];
                                let service_version = target[i].ports.port[x].service['@_version'] === undefined ? "" : target[i].ports.port[x].service['@_version'];
                                let service_name = target[i].ports.port[x].service['@_name'] === undefined ? "" : target[i].ports.port[x].service['@_name'];
                                let port_protocol = target[i].ports.port[x]['@_protocol'];
                                let port_number = target[i].ports.port[x]['@_portid'];

                                db.query('INSERT INTO Ports (port_protocol, port_number, service_name, service_product, service_version, host_id) VALUES (?, ?, ?, ?, ?, ?)', [port_protocol, port_number, service_name, service_product, service_version, host_id], (error, result) => {
                                    if (error) throw error
                                    const port_id = result.insertId

                                    service_product = service_name.split(' ')[0].toLowerCase()
                                    service_version = service_version.split(' ')[0]

                                    if (service_version.indexOf('X') > -1) {
                                        service_version = service_version.split('X')[0];
                                    }
                                    if (target[i].ports.port[x].service.cpe !== undefined) {
                                        let cpe
                                        if (Array.isArray(target[i].ports.port[x].service.cpe)) {
                                            cpe = target[i].ports.port[x].service.cpe[0]
                                        } else {
                                            cpe = target[i].ports.port[x].service.cpe
                                        }
                                        cpeArray = cpe.split(":")
                                        if (cpeArray.length === 5) {
                                            service_product = cpeArray[2]
                                            service_version = cpeArray[4]
                                            service_name = cpeArray[3]
                                        }
                                    }


                                    console.log(`product: ${service_product}, version: ${service_version}, name: ${service_name}, port_id: ${port_id}`)
                                    getCVE.getCVE(service_product, service_version, service_name, port_id, db)
                                });
                            }
                        }
                    }
                });

            }
        }

    });
}

module.exports = { execCode, json2db };