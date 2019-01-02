pragma solidity ^ 0.5 .0;

import 'installed_contracts/zeppelin/contracts/math/SafeMath.sol';


/** @title Q&A bounties */

contract Bounty {
    using SafeMath for uint;
    
    /// @notice set up circuit breaker design pattern
    bool private stopped = false;
    address private owner;
    
    uint public questionCount;
    uint public answerCount;

    constructor() payable public {
        owner = msg.sender;
        questionCount = 0;
        answerCount = 0;
    }

    /// @notice storing all Q and As inside a mapping so they can be searched by id
    mapping(uint => Question) public allQuestions;
    mapping(uint => Answer) public allAnswers;

    struct Question {
        uint id;
        string heading;
        string description;
        uint submitDate;
        uint bountyAmount;
        address payable funder;
        address winner;
    }

    struct Answer {
        uint id;
        uint questionId;
        string description;
        uint submitDate;
        bool accepted;
        address payable proposer;
    }
    
    // events
    event questionAdded(uint questionCount);
    event answerAdded(uint id);
    event answerAccepted(address winner);

    /// @dev modifier, verifies the the caller is the question funder
    modifier isQuestionFunder(uint _id) {
        require(msg.sender == allQuestions[allAnswers[_id].questionId].funder, "Not question funder");_;
    }

    /// @dev modifier, verifies that caller is contract owner
    modifier isAdmin() {
        require(msg.sender == owner);
        _;
    }

    /// @dev Circuit breaker, toggles contract on / off
    function toggleContractActive() isAdmin public {
        stopped = !stopped;
    }

    /// @dev modifier, checks if contract is on / off
    modifier stopInEmergency { if (!stopped) _; }
    modifier onlyInEmergency { if (stopped) _; }

    /// @notice adds a new question
    /// @dev callable by anyone, except contract owner if contract is on
    /// @param _heading short title
    /// @param _description long description of question
    /// @return true and current question count
    function addQuestion(string memory _heading, string memory _description)
    stopInEmergency
    public
    payable
    returns(
        bool
    ) {
        // Ensures that question is funded
        require(msg.value != 0, "Add a bounty amount");
        // Contract owner cannot submit questions
        require(msg.sender != owner, 'Cannot be owner');

        // add new question to mapping using current questionCount as index
        allQuestions[questionCount] = Question({
            id: questionCount,
            heading: _heading,
            description: _description,
            submitDate: now,
            bountyAmount: msg.value,
            funder: msg.sender,
            winner: address(0)
        });

        emit questionAdded(questionCount);

        // increase questionCount after event is emitted
        questionCount += 1;
        return true;
    }

    /// @notice adds a new answer to an existing question
    /// @dev callable by anyone if contract is on
    /// @param _questionId of question to attach the answer to 
    /// @param _description long description of the answer
    /// @return true and the current answer count
    function addAnswer(uint _questionId, string memory _description) stopInEmergency public returns(bool) {

        // add new answer to mapping using current answerCount as index
        allAnswers[answerCount] = Answer({
            id: answerCount,
            questionId: _questionId,
            description: _description,
            submitDate: now,
            accepted: false,
            proposer: msg.sender
        });

        emit answerAdded(answerCount);

        // increase answerCount after event is emitted
        answerCount += 1;
        return true;
    }


    /// @notice get a question by id
    /// @param _id of a question
    /// @return all fields of a question
    function getQuestion(uint _id) public view returns(
        uint id,
        string memory heading,
        string memory description,
        uint submitDate,
        uint bountyAmount,
        address funder,
        address winner) {
        id = allQuestions[_id].id;
        heading = allQuestions[_id].heading;
        description = allQuestions[_id].description;
        submitDate = allQuestions[_id].submitDate;
        bountyAmount = allQuestions[_id].bountyAmount;
        funder = allQuestions[_id].funder;
        winner = allQuestions[_id].winner;
        return (id, heading, description, submitDate, bountyAmount, funder, winner);
    }

    /// @notice get an answer by id
    /// @param _id of an answer
    /// @return all fields of an answer
    function getAnswer(uint _id) public view returns(
        uint id,
        uint questionId,
        string memory description,
        uint submitDate,
        bool accepted,
        address proposer
    ) {
        id = allAnswers[_id].id;
        questionId = allAnswers[_id].questionId;
        description = allAnswers[_id].description;
        submitDate = allAnswers[_id].submitDate;
        accepted = allAnswers[_id].accepted;
        proposer = allAnswers[_id].proposer;

        return (id, questionId, description, submitDate, accepted, proposer);
    }

    /// @notice question funder accepts one answer and the bounty is sent to the answer proposer
    /// @dev can be called only by the question funder
    /// @param _id of an answer
    /// @return true and the proposer's address
    function acceptAnswer(uint _id) isQuestionFunder(_id) stopInEmergency public returns(
        bool) {
        // check that a question is unanswered and no answers tied to that question have been accepted
        require(allAnswers[_id].accepted != true, "Answer already accepted");
        require(allQuestions[allAnswers[_id].questionId].winner == address(0), "Question has been answered");
        
        // flip answer to true
        allAnswers[_id].accepted = true;

        // get question bounty amount
        uint bountyAmount = allQuestions[allAnswers[_id].questionId].bountyAmount;

        // record winner in question
        allQuestions[allAnswers[_id].questionId].winner = allAnswers[_id].proposer;

        // award bounty to proposer, keep 10% fee to pay for transactions
        allQuestions[allAnswers[_id].questionId].bountyAmount = 0;
        uint fee = (bountyAmount  * 10) / 100;
        uint amount = bountyAmount - fee;
        address(allAnswers[_id].proposer).transfer(amount);
        emit answerAccepted(allAnswers[_id].proposer);
        return true;
    }

    /// @notice get current contract balace
    /// @return contract balance
    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    // function withdraw() onlyInEmergency public {
    //     address(owner).transfer(address(this).balance);
    // }

}