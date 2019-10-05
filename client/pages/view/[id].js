import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "../../components/head";
import Layout from "../../components/layout";
import Hero from "../../components/hero";

const View = () => {
  // get url query parameters
  const { id } = useRouter().query;

  const [list, setList] = useState("waiting...");

  const getNotify = async id => {
    const path = `${process.env.apiUrl}/notify/${id}`;
    const response = await fetch(path);
    const json = await response.json();
    console.log(json.messageList);
    if (json.messageList.length === 0) {
      setList("waiting...");
    } else {
      setList(json.messageList);
    }
  };

  useEffect(() => {
    // when component did mount
    const getNotifyTimer = setInterval(() => {
      getNotify(id);
    }, 1000);
    return () => {
      // when component will unmount
      clearInterval(getNotifyTimer);
    };
  });

  return (
    <Layout>
      <Hero>
        <Head title={`View (ID: ${id})`} />
        <h1>ID: {id}</h1>
        <div className="message-area">
          <p>{list}</p>
        </div>
      </Hero>
      <style jsx>{`
        .message-area {
          background: #384040;
          width: 100%;
          height: 80px;
          padding: 10px;
        }

        .message-area p {
          font-size: 60px;
          display: inline;
        }
      `}</style>
    </Layout>
  );
};

export default View;
