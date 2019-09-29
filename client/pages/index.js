import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.baseurl = "http://localhost:8080/notify";
    this.state = {
      id: "",
      messageList: "",
      messageStack: []
    };
  }

  componentDidMount() {
    setInterval(this.postNotify, 1000);
    // setInterval(this.getNotify, 1000);
    setTimeout(() => {
      setInterval(this.getNotify, 1000);
    }, 100);
  }

  handleChange = (event) => {
    this.setState({id: event.target.value});
  }

  getNotify = async () => {
    if (!this.state.id) return;
    const notify = await fetch(`${this.baseurl}/${this.state.id}`)
      .then(response => response.json());
    this.setState({ messageList: notify.messageList });
  }

  pushMessage = (message) => {
    this.state.messageStack.push(message);
  }

  postNotify = async () => {
    if (!this.state.id) return;
    const body = this.state.messageStack.map((m) => `body=${m}`).join("&");
    this.setState({ messageStack: [] });
    const status = await fetch(`${this.baseurl}/${this.state.id}`, {
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(response => response.status);
    console.log(status);
  }

  render() {
    return (
      <div className="App">
        <div className="hero">
          <input className="textbox" type="text" placeholder="id" value={this.state.id} onChange={this.handleChange} />
          <h1>{this.state.messageList}</h1>
          <button className="btn" onClick={
            () => {this.state.messageStack.push("Good")}
          }>Good</button>
          <button className="btn" onClick={
            () => {this.state.messageStack.push("Bad")}
          }>Bad</button>
        </div>
        <style jsx>{`
          .App {
            text-align: center;
          }

          .hero {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: calc(10px + 2vmin);
            color: white;
          }

          .textbox {
            font-size: 30px;
            background-color: #282c34;
            border-color: white;
            border-style: solid;
            border-width: 1px;
            border-radius: 5px;
            height: 40px;
            padding: 5px;
            color: white;
          }

          .btn {
            font-size: 30px;
            background-color: #282c34;
            border-color: white;
            border-style: solid;
            border-width: 1px;
            border-radius: 5px;
            height: 50px;
            padding: 10px;
            margin: 5px;
            color: white;
          }
        `}</style>
      </div>
    );
  }
}

export default Home
