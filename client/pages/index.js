import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.baseurl = "http://localhost:8080/notify";
    this.state = {
      id: ""
    };
  }

  handleChange = event => {
    this.setState({ id: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <div className="hero">
          <input
            className="textbox"
            type="text"
            placeholder="id"
            value={this.state.id}
            onChange={this.handleChange}
          />
          <h1>{this.state.messageList}</h1>
          <Link href="/view/[id]" as={`/view/${this.state.id}`}>
            <a className="btn">VIEW PAGE</a>
          </Link>
          <Link href="/room/[id]" as={`/room/${this.state.id}`}>
            <a className="btn">PUSH PAGE</a>
          </Link>
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

export default Home;
