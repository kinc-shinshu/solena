import React, { useState } from "react";
import Router from "next/router";
import Head from "../components/head";
import Layout from "../components/layout";
import Hero from "../components/hero";

const Home = () => {
  const [id, setId] = useState("");
  const [placeholder, setPlaceholder] = useState("input room ID");

  const handleChange = event => {
    setId(event.target.value);
  };

  const jump2view = () => {
    if (!id) {
      // when textbox is empty, show message
      setPlaceholder("need to input");
      setTimeout(() => {
        setPlaceholder("input room ID");
      }, 500);
      return;
    }
    Router.push("/view/[id]", `/view/${id}`);
  };

  const jump2room = () => {
    if (!id) {
      // when textbox is empty, show message
      setPlaceholder("need to input");
      setTimeout(() => {
        setPlaceholder("input room ID");
      }, 500);
      return;
    }
    Router.push("/room/[id]", `/room/${id}`);
  };

  return (
    <Layout>
      <Head title="Solena" />
      <Hero>
        <h1>Solena</h1>
        <input
          className="textbox"
          type="text"
          placeholder={placeholder}
          value={id}
          onChange={handleChange}
        />
        <button className="btn" onClick={jump2view}>
          VIEW PAGE
        </button>
        <button className="btn" onClick={jump2room}>
          ROOM PAGE
        </button>
      </Hero>
      <style jsx>{`
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
    </Layout>
  );
};

export default Home;
