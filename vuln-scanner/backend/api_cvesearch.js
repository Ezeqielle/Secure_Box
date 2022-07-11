const fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


function getVulnerabilities (prmVendor, prmProduct) {
    let product = prmProduct
    let vendor = prmVendor


    if(vendor == '') {
        getVendor(product)
    } else {
        fetch('https://10.21.22.6:5000/api/search/' + vendor + '/' + product, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err));
    }
}

function getVendor(product){
    console.log("Ta mère la pute")
    const url = "mongodb://10.21.22.6:27017"
    const dbName = "cvedb"
    MongoClient.connect(url, function(err, client) {
        console.log("Connected to MongoDB.");
        const db = client.db(dbName);
	console.log(db + '/' + dbName)
        client.close();
    })
}

getVendor("office")
