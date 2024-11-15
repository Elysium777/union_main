// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/interfaces/IERC5805.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

/**
 * @title IDAO
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice Interface for the DAO contract that implements governance functionality
 */
interface IDAO is IERC20, IERC20Permit, IERC5805, IAccessControl {
    /**
     * @notice Enum representing the different types of votes that can be cast
     */
    enum VoteType {
        Against,
        For,
        Abstain
    }

    /**
     * @notice Emitted when a new proposal is created
     * @param proposalId The unique identifier of the proposal
     * @param proposer Address of the account that created the proposal
     * @param target Address of the contract that the proposal will interact with
     * @param ipfsHash IPFS hash containing the proposal details
     * @param startBlock Block number when voting begins
     * @param endBlock Block number when voting ends
     */
    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        address target,
        string ipfsHash,
        uint256 startBlock,
        uint256 endBlock
    );

    /**
     * @notice Emitted when a vote is cast on a proposal
     * @param voter Address of the account that cast the vote
     * @param proposalId The ID of the proposal being voted on
     * @param support The type of vote cast (For, Against, or Abstain)
     * @param weight The voting power of the voter
     */
    event VoteCast(
        address indexed voter,
        uint256 proposalId,
        VoteType support,
        uint256 weight
    );

    /**
     * @notice Emitted when a proposal is executed
     * @param proposalId The ID of the executed proposal
     */
    event ProposalExecuted(uint256 proposalId);

    /**
     * @notice Creates a new proposal
     * @param target Address of the contract to interact with
     * @param ipfsHash Hash of the proposal document stored on IPFS
     * @return The ID of the newly created proposal
     */
    function propose(
        address target,
        string memory ipfsHash
    ) external returns (uint256);

    /**
     * @notice Allows a token holder to cast their vote on a proposal
     * @param proposalId The ID of the proposal to vote on
     * @param voteType The type of vote to cast (For, Against, or Abstain)
     */
    function castVote(uint256 proposalId, VoteType voteType) external;

    /**
     * @notice Executes a proposal after it has passed
     * @param proposalId The ID of the proposal to execute
     */
    function execute(uint256 proposalId) external;

    /**
     * @notice Retrieves the details of a specific proposal
     * @param proposalId The ID of the proposal to query
     * @return proposer The address that created the proposal
     * @return target The contract address that the proposal will interact with
     * @return ipfsHash The IPFS hash containing the proposal details
     * @return startBlock The block number when voting begins
     * @return endBlock The block number when voting ends
     * @return executed Whether the proposal has been executed
     * @return forVotes The number of votes in favor
     * @return againstVotes The number of votes against
     * @return abstainVotes The number of abstain votes
     */
    function getProposal(
        uint256 proposalId
    )
        external
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
        );

    /**
     * @notice Returns the current nonce for an address (required by ERC20Permit)
     * @param owner The address to query the nonce for
     * @return The current nonce
     */
    function nonces(address owner) external view returns (uint256);
}
