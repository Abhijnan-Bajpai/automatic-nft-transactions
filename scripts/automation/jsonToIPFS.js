const mintNFT = require('./mintNFT.js') 
const axios = require('axios');

const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody, receiverPublicKey) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            console.log(response["data"]["IpfsHash"])
            mintNFT(
              "https://gateway.pinata.cloud/ipfs/"+response["data"]["IpfsHash"], receiverPublicKey
            )
        })
        .catch(function (error) {
            //handle error here
            console.log(error)
        });
  };

module.exports = {pinJSONToIPFS}