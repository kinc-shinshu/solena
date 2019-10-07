import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "../../components/head";
import Layout from "../../components/layout";
import Hero from "../../components/hero";

const Room = () => {
  // get url query parameters
  const { id } = useRouter().query;

  const [queue, setQueue] = useState([]);

  const postNotify = async () => {
    if (queue.length === 0) return;
    const path = `${process.env.apiUrl}/notify/${id}`;
    // create a request body like the following
    /*
      body=XXX&body=YYY&body=ZZZ
    */
    const body = queue.map(m => `body=${m}`).join("&");
    setQueue([]);
    const response = await fetch(path, {
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    });
    const status = await response.status;
    // console.log(status);
  };

  const pushGoodButton = () => {
    queue.push("👍");
  };

  const pushBadButton = () => {
    queue.push("👎");
  };

  useEffect(() => {
    // when component did mount
    const postNotifyTimer = setInterval(() => {
      postNotify(id);
    }, 1000);
    return () => {
      // when component will unmount
      clearInterval(postNotifyTimer);
    };
  });

  return (
    <Layout>
      <Hero>
        <Head title={`Room (ID: ${id})`} />
        <h1>ID: {id}</h1>
        <button className="btn" onClick={pushGoodButton}>
          👍
        </button>
        <button className="btn" onClick={pushBadButton}>
          👎
        </button>
      </Hero>
      <style jsx>{`
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

export default Room;
