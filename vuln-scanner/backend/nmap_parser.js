const fs = require('fs');
const mysql = require('mysql');
const { exec } = require("child_process");

// Database connection //
const db = mysql.createConnection({
  host: "10.21.22.4",
  user: "root",
  password: "example",
  database: "secureBox"
});
  
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

// Command execution //
function execCode(repport, ipRange) {

    let cmd = "nmap -v -sS -p- -sV 9 -PR -O -oX res.xml " + ipRange;
    exec(cmd, (error, stdout,stderr) => {
        if(error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if(stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
    
    exec("fxparser res.xml > result.json", (error, stdout,stderr) => {
        if(error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if(stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

    json2db(repport);
}

// Parsing JSON to DB //
function json2db(repport) {
    fs.readFile('res.json', (err, data) => {
        if(err) throw err;
        let result = JSON.parse(data);
        let target = result.nmaprun.host
        console.log(target.length)   
        for(let i = 0; i < target.length; i++) {
            let stat = target[i].status['@_state'];
            if(stat == 'up') {
                let addrIp = "";
                let addrMac = "";
                let host_id = "";
                if(Array.isArray(target[i].address)) {
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
                    if(target[i].address['@_addr'] === 'ipv4') {
                        addrIp = target[i].address['@_addr'];
                        console.log(addr)
                    } else {
                        addrIp = target[i].address['@_addr'];
                    }
                }

                if(addrMac === '') {
                    addrMac = 'NULL';
                }

                let host_os = target[i].os.osmatch['@_name'];
                        
                if(typeof host_os === 'undefined') {
                    host_os = 'NULL';
                } else {
                    host_os = host_os.split(' ');
                    host_os = host_os[0];
                }
                
                db.query('INSERT INTO host (host_ip, host_os, host_mac, host_status, repport_id) VALUES (?, ?)', [addrIp, host_os, addrMac, stat, repport], (error) => {
                    if(error) throw error;
                    console.log("Host ajouté à la base de données MySQL!");
                });

                db.query('Select host_id from host where host_ip = ?', [addrIp], (error, results) => {
                    if(error) throw error;
                    host_id = results[0].host_id;
                });

                if(typeof target[i].ports !== 'undefined') {
                    for(let x = 0; x < target[i].ports.port.length; x++) {
                        let service_product = "";
                        let service_version = "";
                        let service_name = "";
                        if(typeof target[i].ports.port.service === 'undefined') {
                            service_name = 'NULL';
                        }

                        if(!(target[i].ports.port[x].service)) {
                            service_name = 'NULL';
                        } else {
                            service_name = target[i].ports.port[x].service['@_name'];
                            service_product = target[i].ports.port[x].service['@_product'];
                            if(typeof target[i].ports.port[x].service['@_version'] !== 'undefined') {
                                service_version = 'NULL';
                            } else {
                                service_version = target[i].ports.port[x].service['@_version'];
                            }
                        }

                        let port_protocol = target[i].ports.port[x]['@_protocol'];
                        let port_number = target[i].ports.port[x]['@_portid'];

                        db.query('INSERT INTO port (port_protocol, port_number, service_name, service_product, service_version, host_id) VALUES (?, ?, ?, ?, ?, ?)', [port_protocol, port_number, service_name, service_product, service_version, host_id], (error) => {
                            if(error) throw error;
                            console.log("Port ajouté à la base de données MySQL!");
                        });

                        console.log(`addrMac: ${addrMac} || addrIp: ${addrIp} || status: ${stat} || service_name: ${service_name} || port_number: ${port_number} || port_protocol: ${port_protocol} || service_product: ${service_product} || service_version: ${service_version}`);
                    }
                } 
                console.log('-----')  
            }
        }
    });
}