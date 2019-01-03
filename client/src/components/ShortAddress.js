import React from 'react';

export default class ShortAddress extends React.Component {
  render() {
    const account = this.props.account;
    return (
      <React.Fragment>
        {account.slice(0, 6)}...{account.slice(38, 42)}
      </React.Fragment>
    );
  }
}
