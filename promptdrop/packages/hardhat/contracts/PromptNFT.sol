// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PromptNFT: 用户提交 Prompt 后铸造 NFT
/// @notice 每个地址只能铸造一次
/// @dev 使用 OpenZeppelin ERC721Enumerable 模板

// SECURITY: 没有重入风险，但建议加入 maxSupply 限制优化 gas

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PromptNFT is ERC721Enumerable, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("PromptNFT", "PRNFT") Ownable(msg.sender) {}

    function mintPromptNFT() external {
        require(!hasMinted[msg.sender], "Already minted");
        hasMinted[msg.sender] = true;
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }
}
