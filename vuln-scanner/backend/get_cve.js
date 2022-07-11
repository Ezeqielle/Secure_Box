const { MongoClient } = require("mongodb");
// Connection URI

const hostname = "10.21.22.8";
const port = "27017";
const uri = `mongodb://${hostname}:${port}/?authSource=admin`;


// Create a new MongoClient
const client = new MongoClient(uri);

async function getCVE(prmProduct, prmVendor) {
    try {
        const db = client.db("cvedb");
        const collection = db.collection("cpe");
        const result = await collection.aggregate([
            {
                $unwind: "$cpe_name"
            },
            {
                $match: {
                    $or: [{
                        product: /openssh/
                    },
                    {
                        vendor: /openssh/
                    }],
                    $and: [{
                        $or: [{
                            "cpe_2_2": /:5.8:/
                        },
                        {
                            "cpe_name.cpe23Uri": /:5.8:/
                        }]
                    }, 
                    {
                        //cpe_2_2: //TO WORK ON
                    }]
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
                    _id: "$cpe_name.cpe23Uri"
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
                $group: { _id: "$cves.id", data: {$first: "$cves"}}
            }
        ]).toArray();
        console.log(result);
    } catch {
        console.error("Error reading data from DB");
    }
}

async function run() {
  try {
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to Mongo");

    await getCVE("openssh", "openssh");
  } catch {
    console.error("Error connecting to Mongo");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);