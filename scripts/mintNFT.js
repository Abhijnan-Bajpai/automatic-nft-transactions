require("dotenv").config()
const { sendNft } = require('./sendNFT.js')
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
var fs = require('fs')
var token = 0;
var counterNonce = 0;

async function mintNFT(tokenURI, receiverPublicKey) {
    var contractAddress = " "
    try {  
          contractAddress = fs.readFileSync('publicAddress.txt', 'utf8');
        } catch(e) {
          console.log('Error:', e.stack);
        }
    const contract = require("../artifacts/contracts/MyEpicNft.sol/MyEpicNFT.json")
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
    const txCount = '0x' + (await web3.eth.getTransactionCount(PUBLIC_KEY) + counterNonce).toString(16) //get latest nonce
    counterNonce+=1
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: txCount,
      gas: 700000,
      data: nftContract.methods.makeAnEpicNFT(tokenURI, PUBLIC_KEY).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .then(async function (response) {
        //handle response here
        await new Promise(resolve => setTimeout(resolve, 25000));
        sendNft(receiverPublicKey, token)
        token+=1
    })
      .catch((err) => {
        console.log("Promise failed:", err)
      })
  }
  module.exports = {mintNFT}