const CloudKit = require("../cloudkit.js");
const fetch = require("node-fetch");

let _db; 

const cloudkitConnect = callback => {
    CloudKit.configure({
        services : {fetch: fetch},
        logger: console,
        containers: [{
            containerIdentifier: 'iCloud.com.final.Lina.Lina',
            eviroment: 'development',
            serverToServerKeyAuth: {
                // Generate a key ID through CloudKit Dashboard and insert it here.
                keyID: 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+7N1kc3ixWx/Lggpq+PsNGiGN56A 4ZFowUbdpekRLlQwyWdRzyg+CPLiLHIUthhNGOixpPXi27AUP2Z3NsAgqw==',
                // This should reference the private key file that you used to generate the above key ID.
                privateKeyFile: __dirname + '/eckey.pem'
              }
        }]
    });

    var container = CloudKit.getDefaultContainer();
    _db = container.publicCloudDatabase
    
    container.setUpAuth()
    .then(function(userInfo){
      println("userInfo",userInfo);

      return _db.performQuery({ recordType: 'Test' });
    })
    .then(function(response) {
      println("Queried Records",response.records);

      return _db.saveRecords({recordType: 'Test', recordName: 'hello-u'});
    })
    .then(function(response) {
      var record = response.records[0];
      println("Saved Record",record);

      return _db.fetchRecords(record);
    })
    .then(function(response) {
      var record = response.records[0];
      println("Fetched Record", record);

      return _db.deleteRecords(record);
    })
    .then(function(response) {
      var record = response.records[0];
      println("Deleted Record", record);

      console.log("Done");
      process.exit();
    })
    .catch(function(error) {
      console.warn(error);
      process.exit(1);
    });

    callback();
}

const getDb = () => {
    if(_db) {
        return _db
    }
    throw 'No database found!'
} 

exports.cloudkitConnect = cloudkitConnect;
exports.getDb = getDb;