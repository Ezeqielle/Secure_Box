#!/bin/python3

import requests
import argparse
import json


'''
TODO : 
- Testing
'''


def parse_CVEs(response):
    # Format CVEs in an exploitable list
    CVEs = []
    data = json.loads(response)
    cpes = data["result"]["cpes"]
    for cve in range(len(cpes)):
        for cve in cpes[cve]["vulnerabilities"]:
            if cve not in CVEs:
                if cve:
                    CVEs.append(cve)
    return CVEs

def retrieve_cve(CVE):
    # Request to Nist API to retrieve a specific CVE
    URL = "https://services.nvd.nist.gov/rest/json/cve/1.0/"
    OPTIONS = CVE + "?apiKey="
    r = requests.get(URL + OPTIONS + API_KEY)
    CVEdetails = r.text
    return CVEdetails

def format_cve(CVEdetails):
    # Format to json format in order to parse easier
    CVEdetails_json = json.loads(CVEdetails)

    # Remove request metadata
    CORE_CVE = CVEdetails_json["result"]["CVE_Items"]

    # Parse CVE informations
    HEADER_CVE = {
        "type": CORE_CVE[0]["cve"]["data_type"], 
        "format": CORE_CVE[0]["cve"]["data_format"], 
        "version": CORE_CVE[0]["cve"]["data_version"], 
        "CVE_ID": CORE_CVE[0]["cve"]["CVE_data_meta"]["ID"], 
        "assigner": CORE_CVE[0]["cve"]["CVE_data_meta"]["ASSIGNER"]
    }
    
    # Parse every references
    REFERENCES_CVE = []
    for i in [CORE_CVE[0]["cve"]["references"]["reference_data"]]:
        for j in range(len(i)):
            REFERENCES_CVE.append({
                "url": i[j]["url"], 
                "name": i[j]["name"], 
                "reference_source": i[j]["refsource"], 
                "tags": i[j]["tags"]
            })

    # Parse description
    DESCRIPTION_CVE = CORE_CVE[0]["cve"]["description"]["description_data"]
    DESCRIPTION_CVE = { 
        "description": DESCRIPTION_CVE[0]["value"]
    }

    # Parse impact CVE (v2 and v3 metrics, severity ect)
    IMPACT_CVE = {
        "IMPACT": CORE_CVE[0]["impact"]
    }

    # Publish date of the CVE
    DATE_CVE = {
        "date": CORE_CVE[0]["publishedDate"]
    }

    CVE_FORMATTED = {
        "header_cve": HEADER_CVE,
        "references_cve": REFERENCES_CVE,
        "description_cve": DESCRIPTION_CVE,
        "impact_cve": IMPACT_CVE,
        "date_cve": DATE_CVE
    }

    CVE_json = json.dumps(CVE_FORMATTED, indent=4)
    return CVE_json


f = open("api_key", "r")
API_KEY = f.readline().rstrip("\n")
URL = "https://services.nvd.nist.gov/rest/json/cpes/1.0/"

parser = argparse.ArgumentParser()
parser.add_argument("-V", "--vendor", help="Vendor you are looking for. Ex: Microsoft", required=True)
parser.add_argument("-p", "--product", help="Product you are looking for. Ex: Office", required=True)
parser.add_argument("-v", "--version", help="Version you are lookinf dor. Ex:2019")

args = parser.parse_args()

if args.version:
    OPTIONS = "?addOns=cves&cpeMatchString=cpe:2.3:*:" + args.vendor + ":" + args.product + ":" + args.version + "&apiKey="
    r = requests.get(URL + OPTIONS + API_KEY)
else:
    OPTIONS = "?addOns=cves&cpeMatchString=cpe:2.3:*:" + args.vendor + ":" + args.product + "&apiKey="
    r = requests.get(URL + OPTIONS + API_KEY)

response = r.text

CVEs = parse_CVEs(response)

print(format_cve(retrieve_cve(CVEs[0])))
