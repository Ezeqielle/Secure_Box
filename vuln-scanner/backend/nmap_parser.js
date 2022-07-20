const fs = require('fs');

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
                    let port_id = target[i].ports.port[x]['@_portid'];
                    if(addrMac === '') {
                        addrMac = 'NULL';
                    }

                    console.log(`addrMac: ${addrMac} || addrIp: ${addrIp} || status: ${stat} || service_name: ${service_name} || port_id: ${port_id} || port_protocol: ${port_protocol} || service_product: ${service_product} || service_version: ${service_version}`);
                }
            } 
            console.log('-----')  
        }
    }
});