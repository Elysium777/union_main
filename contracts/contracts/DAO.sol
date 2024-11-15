// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title DAO
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice A simple DAO contract that allows token holders to propose and vote on proposals
 */

contract DAO is ERC20, ERC20Permit, ERC20Votes, AccessControl {
    bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
    uint256 public constant VOTING_DELAY = 1; // 1 block
    uint256 public constant VOTING_PERIOD = 50400; // About 1 week
    uint256 public constant QUORUM_PERCENTAGE = 4; // 4% of total supply

    uint256 private _nextProposalId = 1;

    enum VoteType {
        Against,
        For,
        Abstain
    }

    struct Proposal {
        uint256 id;
        address proposer;
        address target;
        string ipfsHash;
        uint256 startBlock;
        uint256 endBlock;
        bool executed;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        address target,
        string ipfsHash,
        uint256 startBlock,
        uint256 endBlock
    );

    event VoteCast(
        address indexed voter,
        uint256 proposalId,
        VoteType support,
        uint256 weight
    );

    event ProposalExecuted(uint256 proposalId);

    constructor() ERC20("DAO Token", "DAO") ERC20Permit("DAO Token") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PROPOSER_ROLE, msg.sender);
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    /**
     * @notice Propose a new proposal
     * @param target Address of the contract to interact with
     * @param ipfsHash Hash of the proposal document
     */
    function propose(
        address target,
        string memory ipfsHash
    ) public returns (uint256) {
        require(
            hasRole(PROPOSER_ROLE, msg.sender),
            "Caller must have proposer role"
        );

        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        uint256 proposalId = _nextProposalId++;

        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.target = target;
        proposal.ipfsHash = ipfsHash;
        proposal.startBlock = block.number + VOTING_DELAY;
        proposal.endBlock = block.number + VOTING_DELAY + VOTING_PERIOD;

        emit ProposalCreated(
            proposalId,
            msg.sender,
            target,
            ipfsHash,
            proposal.startBlock,
            proposal.endBlock
        );

        return proposalId;
    }

    /**
     * @notice Cast a vote on a proposal
     * @param proposalId The ID of the proposal
     * @param voteType The type of vote (For, Against, Abstain)
     */
    function castVote(uint256 proposalId, VoteType voteType) public {
        require(getVotes(msg.sender) > 0, "No voting power");

        Proposal storage proposal = proposals[proposalId];
        require(block.number >= proposal.startBlock, "Voting not started");
        require(block.number <= proposal.endBlock, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        uint256 weight = getVotes(msg.sender);

        if (voteType == VoteType.For) {
            proposal.forVotes += weight;
        } else if (voteType == VoteType.Against) {
            proposal.againstVotes += weight;
        } else {
            proposal.abstainVotes += weight;
        }

        proposal.hasVoted[msg.sender] = true;

        emit VoteCast(msg.sender, proposalId, voteType, weight);
    }

    /**
     * @notice Check if a voter has voted on a proposal
     * @param proposalId The ID of the proposal
     * @param voter The address of the voter
     */
    function hasVoted(
        uint256 proposalId,
        address voter
    ) public view returns (bool) {
        return proposals[proposalId].hasVoted[voter];
    }

    /**
     * @notice Execute a proposal
     * @param proposalId The ID of the proposal
     */
    function execute(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(block.number > proposal.endBlock, "Voting not ended");
        require(!proposal.executed, "Proposal already executed");

        uint256 totalSupply = totalSupply();
        uint256 quorum = (totalSupply * QUORUM_PERCENTAGE) / 100;

        // Include abstain votes in quorum calculation
        uint256 totalVotes = proposal.forVotes +
            proposal.againstVotes +
            proposal.abstainVotes;
        require(totalVotes >= quorum, "Quorum not reached");

        // Abstain votes don't count towards the final decision
        require(proposal.forVotes > proposal.againstVotes, "Proposal failed");

        proposal.executed = true;

        emit ProposalExecuted(proposalId);
    }

    /**
     * @notice Get the details of a proposal
     * @param proposalId The ID of the proposal
     */
    function getProposal(
        uint256 proposalId
    )
        public
        view
        returns (
            address proposer,
            address target,
            string memory ipfsHash,
            uint256 startBlock,
            uint256 endBlock,
            bool executed,
            uint256 forVotes,
            uint256 againstVotes,
            uint256 abstainVotes
        )
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.proposer,
            proposal.target,
            proposal.ipfsHash,
            proposal.startBlock,
            proposal.endBlock,
            proposal.executed,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.abstainVotes
        );
    }

    /**
     * @dev Internal function to update votes when tokens are transferred
     */
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC20, ERC20Votes) {
        super._update(from, to, amount);
    }

    /**
     * @dev Internal function to get the current block number
     */
    function nonces(
        address owner
    ) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
