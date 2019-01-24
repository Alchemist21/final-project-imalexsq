import React from 'react';
import AddAnswer from './AddAnswer';
import GetAnswers from './GetAnswers';

import ShortAddress from './ShortAddress';

const QuestionCard = ({ question, utils, accounts, contract }) => {
  var time = new Date(Number(question.submitDate));

  let isQClosed;

  if (question.state === '0') {
    isQClosed = (
      <React.Fragment>
        <div className="card-body">
          <AddAnswer
            qId={question.id}
            account={accounts[0]}
            contract={contract}
          />
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className="card mb-3" key={Math.random()}>
      <div className="card-body">
        <h5 className="card-title">{question.heading}</h5>
        <p className="card-text">{question.description}</p>
        <p className="card-text">Submitted: {String(time)}</p>
        <p className="card-text">
          By: <ShortAddress account={question.funder} />
        </p>
        <p className="card-text">
          Bounty Amount: {utils.fromWei(question.bountyAmount)} Ether
        </p>
        <p className="card-text">
          Winner: <ShortAddress account={question.winner} />
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <GetAnswers
          question={question}
          account={accounts[0]}
          contract={contract}
        />
      </ul>
      {isQClosed}
    </div>
  );
};

export default QuestionCard;
