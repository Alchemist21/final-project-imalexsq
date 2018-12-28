import React from 'react';

export default class ActionButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        <a href="#" className="text-success">
          Accept
        </a>
        <span className="px-1"> or </span>
        <a href="#" className="text-danger">
          Reject
        </a>
      </React.Fragment>
    );
  }
}
