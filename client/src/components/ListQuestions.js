import React from 'react';
import axios from 'axios';

export default class ListQuestions extends React.Component {
  state = {
    questions: [],
    header: [],
    error: '',
    loading: ''
  };

  componentDidMount = () => {
    axios
      .get('http://127.0.0.1:8080/allQuestions')
      .then(res => {
        const header = Object.keys(res.data[0]);
        this.setState({ questions: res.data, header });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { questions } = this.state;
    return (
      <React.Fragment>
        <h1>All Questions</h1>
        {questions.map(question => {
          var time = new Date(Number(question.submitDate));
          return (
            <div className="card text-center mt-3" key={Math.random()}>
              <div className="card-header">Question</div>
              <div className="card-body">
                <h5 className="card-title">{question.heading}</h5>
                <p className="card-text">{question.description}</p>
                <a href="#" className="btn btn-primary">
                  Add answer
                </a>
              </div>
              <div className="card-footer text-muted">
                Submitted: {String(time)}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
