const { MongoClient } = require("mongodb");
// Connection URI

const hostname = "10.21.22.8";
const port = "27017";
const uri = `mongodb://${hostname}:${port}/?authSource=admin`;

// Create a new MongoClient
const client = new MongoClient(uri);

async function uploadToDatabase(prmPortId, prmCVES, db) {

    const obj = JSON.parse(prmCVES);
    for (let cveIndex = 0; cveIndex < Object.keys(obj).length; cveIndex++) {
        let cve = obj[cveIndex]["data"];
        const references = JSON.stringify(Object.assign({}, cve["references"]))
        db.query(`INSERT INTO CVE (cve_name, cve_published, cve_summary, cve_access_auth, cve_access_complexity, cve_access_vector, cve_impact_avaibility, cve_impact_confidentiality, cve_impact_integrity, cve_cvss_three, cve_cvss, cve_exploitability_score, cve_impact_score, cve_references, cve_cwe, port_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [
            cve['id'], cve['Published'], cve['summary'], cve["access"]["authentication"], cve["access"]["complexity"],
            cve["access"]["vector"], cve["impact"]["availability"], cve["impact"]["confidentiality"], cve["impact"]["integrity"],
            cve["cvss3"], cve["cvss"], cve["exploitabilityScore"], cve["impactScore"], references, cve["cwe"], prmPortId], (error) => {
                if (error) throw error;
            })


        /* INSERT INTO CVE (cve_name, cve_summary, cve_access_auth, cve_access_complexity, cve_access_vector, cve_impact_avaibility, cve_impact_confidentiality, cve_impact_integrity, cve_cvss_three, cve_cvss, cve_exploitability_score, cve_impact_score, cve_references, cve_cwe, port_id)
           VALUES ("CVE-0000-0000", "This is a CVE TEST", "NONE", "LOW", "NETWORK", "PARTIAL", "NONE", "NONE", 7.8, 6.9, 10, 2.4, '{"0": "Reference", "1": "Reference"}', "CWE-TEST", 1); */

    }
}

async function getCVE(prmProduct, prmVersion, prmService, prmPortId, db) {
    try {
        const mongoDb = client.db("cvedb");
        const collection = mongoDb.collection("cpe");
        const result = await collection.aggregate([
            {
                $unwind: "$cpe_name"
            },
            {
                $match: {
                    $or: [{
                        "product": new RegExp(prmProduct, 'i')
                    },
                    {
                        "vendor": new RegExp(prmProduct, 'i')
                    }],
                    $and: [{
                        $or: [{
                            "cpe_2_2": new RegExp(':' + prmVersion + ':')
                        },
                        {
                            "cpe_name.cpe23Uri": new RegExp(':' + prmVersion + ':')
                        }]
                    },
                    {
                        "cpe_2_2": new RegExp(prmService, 'i')
                    }],

                }
            },
            {
                $project: {
                    "_id": 0,
                    "cpe_2_2": 1,
                    "cpe_name.cpe23Uri": 1
                }
            },
            {
                $group: {
                    "_id": "$cpe_name.cpe23Uri"
                }
            },
            {
                $lookup: {
                    from: "cves",
                    localField: "_id",
                    foreignField: "vulnerable_configuration",
                    as: "cves"
                }
            },
            {
                $unwind: "$cves"
            },
            {
                $group: { _id: "$cves.id", data: { $first: "$cves" } }
            },
            {
                $sort: { _id: -1 }
            }
        ]).toArray();
        data = result
        dataFormatted = JSON.stringify(data, null, 2);
        //console.log(dataFormatted)
        uploadToDatabase(prmPortId, dataFormatted, db);
    } catch {
        console.error("Error reading data from DB");
    }
}

module.exports = { uploadToDatabase, getCVE };