// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IDAO.sol";

/**
 * @title Base Union
 * @author Anoy Roy Chowdhury - <anoyroyc3545@gmail.com>
 * @notice Base contract for a Union that allows members to vote on proposals internally
 */
abstract contract BaseUnion is AccessControl {
    bytes32 public constant MEMBER_ROLE = keccak256("MEMBER_ROLE");

    IERC20 public daoToken;
    IDAO public dao;
    string public name;

    struct InternalVotes {
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => InternalVotes) public internalVotes;
    mapping(address => uint256) public nonces;
    mapping(address => uint256) public tokenDelegate;
    uint256 public internalDeadlineInterval;

    event UnionVoteCast(
        uint256 indexed proposalId,
        uint8 finalDecision,
        uint256 totalVotingPower
    );

    event InternalVoteCast(
        uint256 indexed proposalId,
        uint8 decision,
        uint256 votingPower
    );

    modifier onlyMember() {
        require(hasRole(MEMBER_ROLE, msg.sender), "Not a member");
        _;
    }

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not an admin");
        _;
    }

    /**
     * @notice Initializes the Union with the DAO token and DAO contract
     * @param _daoToken Address of the DAO token
     * @param _dao Address of the DAO contract
     * @param _name Name of the Union
     * @param admin Address of the admin
     */
    function initializeUnion(
        address _daoToken,
        address _dao,
        string memory _name,
        address admin
    ) internal {
        require(address(daoToken) == address(0), "Already initialized");
        daoToken = IERC20(_daoToken);
        dao = IDAO(_dao);
        name = _name;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        dao.delegate(address(this));
    }

    /**
     * @notice Sets the internal deadline interval for voting
     * @param _internalDeadlineInterval Interval in blocks
     */
    function setInternalDeadlineInterval(
        uint256 _internalDeadlineInterval
    ) public onlyAdmin {
        internalDeadlineInterval = _internalDeadlineInterval;
    }

    /**
     * @notice Allows a user to join the Union by delegating DAO tokens
     * @param _tokensToDelegate Amount of DAO tokens to delegate
     */
    function joinUnion(uint256 _tokensToDelegate) public virtual {
        require(!hasRole(MEMBER_ROLE, msg.sender), "Already a member");
        require(
            daoToken.balanceOf(msg.sender) > 0,
            "Insufficient DAO tokens to join"
        );

        daoToken.transferFrom(msg.sender, address(this), _tokensToDelegate);

        tokenDelegate[msg.sender] = _tokensToDelegate;

        _grantRole(MEMBER_ROLE, msg.sender);
    }

    /**
     * @notice Checks if a user has voted on a proposal
     * @param proposalId  The ID of the proposal
     * @param voter  The address of the voter
     */
    function hasVoted(
        uint256 proposalId,
        address voter
    ) public view returns (bool) {
        return internalVotes[proposalId].hasVoted[voter];
    }

    /**
     * @notice Allows a user to leave the Union and withdraw their DAO tokens
     */
    function leaveUnion() public virtual onlyMember {
        require(hasRole(MEMBER_ROLE, msg.sender), "Not a member");

        _revokeRole(MEMBER_ROLE, msg.sender);

        uint256 tokensToWithdraw = tokenDelegate[msg.sender];

        tokenDelegate[msg.sender] = 0;

        daoToken.transfer(msg.sender, tokensToWithdraw);
    }

    /**
     *  @notice Allows a user to vote on a main DAO proposal
     * @param proposalId The ID of the proposal to vote on
     */
    function voteFinal(uint256 proposalId) public onlyMember {
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
        require(block.number >= startBlock, "Voting has not started");
        require(block.number < endBlock, "Voting has ended");

        uint256 votingPower = dao.getVotes(address(this));

        require(votingPower > 0, "No voting power");

        InternalVotes storage internalVote = internalVotes[proposalId];

        if (internalVote.forVotes > internalVote.againstVotes) {
            if (internalVote.forVotes > internalVote.abstainVotes) {
                dao.castVote(proposalId, IDAO.VoteType.For);
            } else {
                dao.castVote(proposalId, IDAO.VoteType.Abstain);
            }
        } else {
            if (internalVote.againstVotes > internalVote.abstainVotes) {
                dao.castVote(proposalId, IDAO.VoteType.Against);
            } else {
                dao.castVote(proposalId, IDAO.VoteType.Abstain);
            }
        }

        emit UnionVoteCast(
            proposalId,
            internalVote.forVotes > internalVote.againstVotes
                ? internalVote.forVotes > internalVote.abstainVotes ? 1 : 3
                : internalVote.againstVotes > internalVote.abstainVotes
                ? 2
                : 3,
            votingPower
        );
    }

    /**
     * @notice Abstract function to get the voting power of a member
     * @param member Address of the member
     */
    function getVotingPower(
        address member
    ) public view virtual returns (uint256);
}
