const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('myEpicNft');
    // After the script completes it'll destroy that local network. So, every time you run the contract, it'll be a fresh blockchain. Whats the point? It's kinda like refreshing your local server every time so you always start from a clean slate which makes it easy to debug errors.
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    // Call the function
    // let txn = await nftContract.makeAnEpicNFT();
    // await txn.wait();

    // let txn2 = await nftContract.makeAnEpicNFT();
    // await txn2.wait();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error){
        console.log(error);
        process.exit(1);
    }
};

runMain();