// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "../base/BaseUnion.sol";
import "../common/Singleton.sol";
import "../common/StorageAccessible.sol";

/**
 * @title Conviction Union
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice Conviction Union contract
 */
contract ConvictionUnion is Singleton, StorageAccessible, BaseUnion {
    mapping(address => uint256) public lockingTime;
    uint256 public lockInterval;

    /**
     * @notice Initializes the Conviction Union contract
     * @param _daoToken The address of the DAO token
     * @param _dao The address of the DAO contract
     * @param _name The name of the union
     * @param admin The address of the admin
     * @param _lockInterval The interval to lock the tokens
     */
    function initializeConvictionUnion(
        address _daoToken,
        address _dao,
        string memory _name,
        address admin,
        uint256 _lockInterval
    ) external {
        require(_lockInterval > 0, "Invalid lock interval");
        initializeUnion(_daoToken, _dao, _name, admin);
        lockInterval = _lockInterval;
    }

    /**
     * @notice Get the voting power of a member
     * @param member The address of the member
     */
    function getVotingPower(
        address member
    ) public view override returns (uint256) {
        return tokenDelegate[member] * (lockingTime[member] / lockInterval);
    }

    /**
     * @notice Join the union
     * @param _tokenToDelegate The amount of tokens to delegate
     * @param time The time to lock the tokens
     */
    function joinUnion(uint256 _tokenToDelegate, uint256 time) public {
        require(
            lockingTime[msg.sender] == 0 || lockingTime[msg.sender] < time,
            "Locking time not passed"
        );
        require(time > 0, "Invalid locking time");
        require(time % lockInterval == 0, "Invalid locking time");

        super.joinUnion(_tokenToDelegate);

        lockingTime[msg.sender] = time;
    }

    /**
     * @notice Leave the union
     */
    function leaveUnion() public override {
        require(
            lockingTime[msg.sender] == 0 ||
                lockingTime[msg.sender] < block.timestamp,
            "Locking time not passed"
        );

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
