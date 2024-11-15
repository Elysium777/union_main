// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;
import "../base/BaseUnion.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../common/Singleton.sol";
import "../common/StorageAccessible.sol";

/**
 * @title NFT Union
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice NFT Union contract where voting power is based on NFT ownership
 */
contract NFTUnion is Singleton, StorageAccessible, BaseUnion {
    // NFT contract address
    IERC721 public nftContract;

    // Minimum number of NFTs required to join
    uint256 public minNFTsRequired;

    /**
     * @notice Initializes the NFT Union contract
     * @param _daoToken The address of the DAO token
     * @param _dao The address of the DAO contract
     * @param _name The name of the union
     * @param _admin The address of the admin
     * @param _nftContract The address of the NFT contract
     * @param _minNFTsRequired Minimum number of NFTs to join the union
     */
    function initializeNFTUnion(
        address _daoToken,
        address _dao,
        string memory _name,
        address _admin,
        address _nftContract,
        uint256 _minNFTsRequired
    ) external {
        require(_nftContract != address(0), "Invalid NFT contract");
        require(_minNFTsRequired > 0, "Minimum NFTs must be positive");

        initializeUnion(_daoToken, _dao, _name, _admin);
        nftContract = IERC721(_nftContract);
        minNFTsRequired = _minNFTsRequired;
    }

    /**
     * @notice Get the voting power of a member based on NFT ownership
     * @param member The address of the member
     */
    function getVotingPower(
        address member
    ) public view override returns (uint256) {
        // Voting power is the number of NFTs owned, capped at a maximum
        uint256 nftBalance = nftContract.balanceOf(member);
        return nftBalance >= minNFTsRequired ? nftBalance : 0;
    }

    /**
     * @notice Join the union
     * @param _tokenToDelegate The amount of tokens to delegate
     */
    function joinUnion(uint256 _tokenToDelegate) public override {
        // Ensure the member has the minimum required NFTs
        require(
            nftContract.balanceOf(msg.sender) >= minNFTsRequired,
            "Insufficient NFT balance"
        );

        // Call the parent join union method
        super.joinUnion(_tokenToDelegate);
    }

    /**
     * @notice Leave the union
     */
    function leaveUnion() public override {
        super.leaveUnion();
    }

    /**
     * @notice Vote on a proposal
     * @param proposalId The id of the proposal
     * @param decision The decision of the voter
     */
    function voteInternal(uint256 proposalId, uint8 decision) public {
        InternalVotes storage internalVote = internalVotes[proposalId];

        (
            address proposer,
            ,
            ,
            uint256 startBlock,
            uint256 endBlock,
            ,
            ,
            ,

        ) = dao.getProposal(proposalId);

        require(proposer != address(0), "Invalid proposal");
        require(!internalVote.executed, "Already executed");
        require(block.number <= endBlock, "Voting period ended");
        require(!internalVote.hasVoted[msg.sender], "Already voted");
        require(block.number >= startBlock, "Voting not started");
        require(
            block.number < endBlock - internalDeadlineInterval,
            "Internal voting deadline passed"
        );
        require(tokenDelegate[msg.sender] >= 0, "No Tokens delegated");

        uint256 weight = getVotingPower(msg.sender);
        require(weight > 0, "No voting power");

        if (decision == 1) {
            internalVote.forVotes += weight;
        } else if (decision == 2) {
            internalVote.againstVotes += weight;
        } else {
            internalVote.abstainVotes += weight;
        }

        internalVote.hasVoted[msg.sender] = true;
        emit InternalVoteCast(proposalId, decision, weight);
    }
}
