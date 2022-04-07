import json
import xmltodict
# bash :
# $ git clone https://github.com/scipag/vulscan scipag_vulscan

# NMAP COMMAND: nmap -v -sS -p- -sV 9 -PR -O -T2 --script=$(pwd)/scipag_vluscan/vulscan.nse -oX res.xml 192.168.1.0/24

# Convert xml to json
with open("res.xml") as xml_f:
    xml_content = xml_f.read()
    json_f = open("res.json", 'w')
    json_f.write(json.dumps(xmltodict.parse(xml_content), indent=4, sort_keys=True))
    json_f.close()

# Clean json
with open("export.json", 'w') as f:
    json_f = open("res.json", 'r')
    json_f_obj = json.load(json_f)
    json_f.close()
    json_obj = {"host": []}

    for host in json_f_obj["nmaprun"]["host"]:
        # If host is up 
        if host["status"]["@state"]=="up":
            # If has os matches 
            if "osmatch" in host["os"]:
                temp_os_match = host["os"]["osmatch"]
                host["os"]["osmatch"] = []
                # If has multiple os matches
                if isinstance(temp_os_match, list):
                    # keep only first two os matches
                    host["os"]["osmatch"].append(temp_os_match[0])
                    host["os"]["osmatch"].append(temp_os_match[1])
                else:
                    host["os"]["osmatch"].append(temp_os_match)
            
            # Remove unwanted data from host
            host["os"].pop("portused", None)
            host.pop("distance", None)
            host.pop("ipidsequence", None)
            host.pop("tcpsequence", None)
            host.pop("tcptssequence", None)
            host.pop("times", None)

            # Append host 
            json_obj["host"].append(host)
            
            #print(f"IP: {host_ip}")
    f.write(json.dumps(json_obj, indent=4))