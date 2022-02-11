require("dotenv").config()
const { pinJSONToIPFS } = require('./jsonToIPFS.js')
const {spawn} = require('child_process');
const apiKey = process.env.PINATA_API_KEY
const secretKey = process.env.PINATA_API_SECRET
console.log(apiKey)
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const name = req.headers.name;
    const receiverPublicKey = req.headers.address;
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python3', ['addNames.py', name]);
    // collect data from script
    python.stdout.on('data', function (data) {
     dataToSend = data.toString();
     NFTdata = {
      "name": "Newolf Token of Appreciation!",
      "description": "Hope you enjoyed our event! See you in the next one :)",
      "image": dataToSend
      }
      pinJSONToIPFS(apiKey, secretKey, NFTdata, receiverPublicKey)
    });
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend)
    });
    
   })
app.listen(port, () => console.log(`Example app listening on port 
   ${port}!`))