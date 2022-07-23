const fs = require('fs');
//const { exec } = require("child_process");
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
                    let host_os = target[i].os.osmatch['@_name'];
                    host_os = host_os.split(' ');
                    host_os = host_os[0];
                }

                db.query('INSERT INTO Hosts (host_name, host_ip, host_os, host_mac, host_status, scan_id) VALUES (?, ?, ?, ?, ?, ?)', [hostName, addrIp, host_os, addrMac, stat, scanId], (error, result) => {
                    if (error) throw error

                    
                    if (target[i].ports !== undefined) {
                        const host_id = result.insertId
                        let service_product
                        let service_version
                        let service_name
                        let port_protocol
                        let port_number
                        for (let x = 0; x < target[i].ports.port.length; x++) {

                            if (target[i].ports.port[x].service !== undefined) {
                                service_product = target[i].ports.port[x].service['@_product'] === undefined ? "None" : target[i].ports.port[x].service['@_product'];
                                service_version = target[i].ports.port[x].service['@_version'] === undefined ? "None" : target[i].ports.port[x].service['@_version'];
                                service_name = target[i].ports.port[x].service['@_name'] === undefined ? "None" : target[i].ports.port[x].service['@_name'];
                                port_protocol = target[i].ports.port[x]['@_protocol'];
                                port_number = target[i].ports.port[x]['@_portid'];
                                
                                db.query('INSERT INTO Ports (port_protocol, port_number, service_name, service_product, service_version, host_id) VALUES (?, ?, ?, ?, ?, ?)', [port_protocol, port_number, service_name, service_product, service_version, host_id], (error, result) => {
                                    if (error) throw error
                                    const port_id = result.insertId

                                    if (service_version.indexOf('X') > -1) {
                                        service_version = service_version.split('X')[0];
                                        //call_api_martin(port_id, service_name, service_product, service_version);
                                    }
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