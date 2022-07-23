const fs = require('fs');
//const { exec } = require("child_process");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { XMLParser } = require('fast-xml-parser');

async function dbQuery(query, data, db) {
    return new Promise((resolve, reject) => {
        db.query(query, data, (error, result) => {
            if (error) {
                return reject(error);
            }
            console.log("ajouté à la base de données MySQL!");
            resolve(result.insertid);
        });
    })
}

// Command execution //
async function execCode(scanId, scanTarget, db) {

    //let cmd = `nmap -v -T5 -sS -p- -sV 9 -PR -O -oX ${scanId}-res.xml ${scanTarget}`;
    //const { nmapStdout, nmapStderr } = await exec(cmd);

    //console.log(`stdout: ${nmapStdout}\nstderr: ${nmapStderr}`);

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
        //console.log(result)
        let target = result.nmaprun.host
        let hostUps = 0
        for (let i = 0; i < target.length; i++) {
            let stat = target[i].status['@_state'];
            if (stat === 'up') {
                hostUps += 1
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

                const host_id = await dbQuery('INSERT INTO Hosts (host_name, host_ip, host_os, host_mac, host_status, scan_id) VALUES (?, ?, ?, ?, ?, ?)', [hostName, addrIp, host_os, addrMac, stat, scanId], db)


                const targetIndex = i
                if (target[targetIndex].ports !== undefined) {
                    for (let x = 0; x < target[targetIndex].ports.port.length; x++) {

                        if (target[targetIndex].ports.port.service !== undefined) {
                            const service_product = target[targetIndex].ports.port[x].service['@_product'];
                            const service_version = target[targetIndex].ports.port[x].service['@_name'];
                            const service_name = target[targetIndex].ports.port[x].service['@_name'];
                            if (service_product !== undefined && service_version !== undefined && service_name !== undefined) {
                                const port_protocol = target[targetIndex].ports.port[x]['@_protocol'];
                                const port_number = target[targetIndex].ports.port[x]['@_portid'];
                                const port_id = await dbQuery('INSERT INTO Ports (port_protocol, port_number, service_name, service_product, service_version, host_id) VALUES (?, ?, ?, ?, ?, ?)', [port_protocol, port_number, service_name, service_product, service_version, host_id], db)
                                if (service_version.indexOf('X') > -1) {
                                    service_version = service_version.split('X')[0];
                                    //call_api_martin(port_id, service_name, service_product, service_version);
                                }
                            }
                        }
                        //console.log(`addrMac: ${addrMac} || addrIp: ${addrIp} || status: ${stat} || service_name: ${service_name} || port_number: ${port_number} || port_protocol: ${port_protocol} || service_product: ${service_product} || service_version: ${service_version}`);
                    }
                }




                //console.log('-----')  
            }
        }
        console.log(hostUps + "\n")
    });
}

module.exports = { execCode, json2db };