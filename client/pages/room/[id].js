import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "../../components/head";
import Nav from "../../components/nav";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // when component did mount
    return () => {
      // when component will unmount
      clearInterval(postNotifyTimer);
    };
  });

  const postNotify = async () => {
    if (id === undefined) return;
    const path = `${process.env.apiUrl}/notify/${id}`;
    const body = queue.map(m => `body=${m}`).join("&");
    setQueue([]);
    const status = await fetch(path, {
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(response => response.status);
    console.log(status);
  };

  const postNotifyTimer = setInterval(() => {
    postNotify(id);
  }, 1000);
  return (
    <div className="App">
      <div className="hero">
        <h1>ID: {id}</h1>
        <button
          className="btn"
          onClick={() => {
            queue.push("Good");
          }}
        >
          Good
        </button>
        <button
          className="btn"
          onClick={() => {
            queue.push("Bad");
          }}
        >
          Bad
        </button>
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
};

export default Room;
