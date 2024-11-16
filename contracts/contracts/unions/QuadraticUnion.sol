// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "../base/BaseUnion.sol";
import "../common/Singleton.sol";
import "../common/StorageAccessible.sol";

/**
 * @title Quadratic Union
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice Quadratic Union contract implementing quadratic voting with voice credits
 */
contract QuadraticUnion is Singleton, StorageAccessible, BaseUnion {
    uint256 public constant VOICE_CREDITS_PER_PROPOSAL = 100;

    struct VoterInfo {
        uint256 votesUsed; // Number of votes cast
        uint256 creditsSpent; // Voice credits spent
        bool hasVoted; // Whether the voter has participated
    }

    // proposalId => voter => VoterInfo
    mapping(uint256 => mapping(address => VoterInfo)) public voterInfo;

    /**
     * @notice Initializes the Quadratic Union contract
     * @param _daoToken The address of the DAO token
     * @param _dao The address of the DAO contract
     * @param _name The name of the union
     * @param admin The address of the admin
     */
    function initializeQuadraticUnion(
        address _daoToken,
        address _dao,
        string memory _name,
        address admin
    ) external {
        initializeUnion(_daoToken, _dao, _name, admin);
    }

    /**
     * @notice Join the union
     * @param _tokenToDelegate The amount of tokens to delegate
     */
    function joinUnion(uint256 _tokenToDelegate) public override {
        super.joinUnion(_tokenToDelegate);
    }

    /**
     * @notice Leave the union
     */
    function leaveUnion() public override {
        super.leaveUnion();
    }

    /**
     * @notice Calculate the voice credits needed for a given number of votes
     * @param votes Number of votes to cast
     * @return credits Voice credits required
     */
    function calculateVoiceCredits(
        uint256 votes
    ) public pure returns (uint256) {
        return votes * votes; // Quadratic cost formula
    }

    /**
     * @notice Implementation of abstract function from BaseUnion
     * @param member The address of the member
     * @return The voting power of the member
     */
    function getVotingPower(
        address member
    ) public view override returns (uint256) {
        return tokenDelegate[member] > 0 ? 1 : 0; // Basic check if member has delegated tokens
    }

    /**
     * @notice Get remaining voice credits for a voter on a specific proposal
     * @param proposalId The id of the proposal
     * @param voter The address of the voter
     * @return remaining Voice credits remaining
     */
    function getRemainingCredits(
        uint256 proposalId,
        address voter
    ) public view returns (uint256) {
        return
            VOICE_CREDITS_PER_PROPOSAL -
            voterInfo[proposalId][voter].creditsSpent;
    }

    /**
     * @notice Vote on a proposal using quadratic voting with voice credits
     * @param proposalId The id of the proposal
     * @param decision The decision (1: for, 2: against, 3: abstain)
     * @param numberOfVotes The number of votes to cast
     */
    function voteInternal(
        uint256 proposalId,
        uint8 decision,
        uint256 numberOfVotes
    ) public {
        require(numberOfVotes > 0, "Must cast at least one vote");

        InternalVotes storage internalVote = internalVotes[proposalId];
        VoterInfo storage voter = voterInfo[proposalId][msg.sender];

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

        // Basic validation
        require(proposer != address(0), "Invalid proposal");
        require(!internalVote.executed, "Already executed");
        require(block.number <= endBlock, "Voting period ended");
        require(!voter.hasVoted, "Already voted");
        require(block.number >= startBlock, "Voting not started");
        require(
            block.number < endBlock - internalDeadlineInterval,
            "Internal voting deadline passed"
        );
        require(tokenDelegate[msg.sender] > 0, "Must delegate tokens to vote");

        // Calculate voice credits needed
        uint256 creditsNeeded = calculateVoiceCredits(numberOfVotes);
        require(
            creditsNeeded <= VOICE_CREDITS_PER_PROPOSAL,
            "Exceeds maximum voice credits"
        );
        require(
            creditsNeeded <= getRemainingCredits(proposalId, msg.sender),
            "Insufficient voice credits"
        );

        // Update voter info
        voter.votesUsed = numberOfVotes;
        voter.creditsSpent = creditsNeeded;
        voter.hasVoted = true;

        // Update vote tallies
        if (decision == 1) {
            internalVote.forVotes += creditsNeeded;
        } else if (decision == 2) {
            internalVote.againstVotes += creditsNeeded;
        } else {
            internalVote.abstainVotes += creditsNeeded;
        }

        internalVote.hasVoted[msg.sender] = true;

        emit InternalVoteCast(proposalId, decision, numberOfVotes);
    }

    /**
     * @notice Get the voting stats for a voter on a specific proposal
     * @param proposalId The id of the proposal
     * @param voter The address of the voter
     * @return votesUsed Number of votes cast
     * @return creditsSpent Voice credits spent
     * @return remainingCredits Voice credits remaining
     */
    function getVoterStats(
        uint256 proposalId,
        address voter
    )
        external
        view
        returns (
            uint256 votesUsed,
            uint256 creditsSpent,
            uint256 remainingCredits
        )
    {
        VoterInfo memory info = voterInfo[proposalId][voter];
        return (
            info.votesUsed,
            info.creditsSpent,
            getRemainingCredits(proposalId, voter)
        );
    }
}
