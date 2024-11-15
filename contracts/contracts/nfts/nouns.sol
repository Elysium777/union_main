// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NounsNFT is ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721("NOUNS_NFT", "NOUN") {}

    function awardItem(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }
}
