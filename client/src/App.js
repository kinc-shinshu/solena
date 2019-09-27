import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.baseurl = "http://localhost:8080/notify";
    this.state = {
      id: "",
      notify: ""
    };
  }

  componentDidMount() {
    setInterval(this.getNotify, 1000);
  }

  handleChange = (event) => {
    this.setState({id: event.target.value});
  }

  getNotify = async () => {
    if (!this.state.id) return;
    const notify = await fetch(`${this.baseurl}/${this.state.id}`)
      .then(response => response.text());
    this.setState({ notify });
  }

  render() {
    return (
      <div className="App">
        <div className="hero">
          <input className="textbox" type="text" placeholder="id" value={this.state.id} onChange={this.handleChange} />
          <h1>{this.state.notify}</h1>
        </div>
      </div>
    );
  }
}

export default App;
