// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// First import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// Inherit the contract we imported. This means one has access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage {
  // Magic given by OpenZeppelin to help one keep track of tokenIds.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // Need to pass the name of the NFTs token and its symbol.
  constructor() ERC721 ("NewolfBlockchainNFT", "Badge") {}

  // A function the user will hit to get their NFT.
  function makeAnEpicNFT(string memory _url, address _receiverPublicAddress) public returns (uint256) {
     // Get the current tokenId, this starts at 0.
    uint256 newItemId = _tokenIds.current();

     // Actually mint the NFT to the sender using msg.sender.
    _safeMint(_receiverPublicAddress, newItemId);

    // Set the NFTs data.
    _setTokenURI(newItemId, _url);

    // Increment the counter for when the next NFT is minted.
    _tokenIds.increment();

    return newItemId;
  }
}