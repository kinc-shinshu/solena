import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "../../components/head";
import Layout from "../../components/layout";
import Hero from "../../components/hero";

const View = () => {
  // get url query parameters
  const { id } = useRouter().query;

  const [list, setList] = useState(". . .");

  const getNotify = async id => {
    const path = `${process.env.apiUrl}/notify/${id}`;
    const response = await fetch(path);
    const json = await response.json();
    // console.log(json.messageList);
    setList(json.messageList);
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
        <h1>ID: {id}</h1>
        <h1>{list}</h1>
      </Hero>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default View;
