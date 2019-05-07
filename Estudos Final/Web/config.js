module.exports = {
    // Replace this with a container that you own.
    containerIdentifier:'com.example.apple-samplecode.cloudkit-catalog',
   
    environment: 'development',
   
    serverToServerKeyAuth: {
      // Generate a key ID through CloudKit Dashboard and insert it here.
      keyID: '<insert key ID>',
   
      // This should reference the private key file that you used to generate the above key ID.
      privateKeyFile: __dirname + '/eckey.pem'
    }
  };