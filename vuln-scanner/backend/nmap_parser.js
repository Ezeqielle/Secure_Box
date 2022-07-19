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
                    //let port_cpe = "";
                    let service_name = "";
                    if(typeof target[i].ports.port.service === 'undefined') {
                        service_name = 'NULL';
                    }

                    if(target[i].ports.port.service === 'NULL') {
                        service_name = 'NULL';
                    } else {
                        service_name = target[i].ports.port[x].service['@_name'];
                    }

                    //if(typeof target[i].ports.port[x].service.cpe === 'undefined'){
                    //    port_cpe = 'NULL';
                    //} else {
                    //    port_cpe = target[i].ports.port[x].service.cpe[0];
                    //}

                    let port_protocol = target[i].ports.port[x]['@_protocol'];
                    let port_id = target[i].ports.port[x]['@_portid'];
                    if(addrMac === 'NULL') {
                        addrMac = 'NULL';
                    }

                    console.log(`addrMac: ${addrMac} || addrIp: ${addrIp} || status: ${stat} || service_name: ${service_name} || port_id: ${port_id} || port_protocol: ${port_protocol}`);
                }
            } 
            console.log('-----')  
        }
    }
});