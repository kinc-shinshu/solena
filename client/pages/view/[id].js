import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from '../../components/head'
import Nav from '../../components/nav'

const View = () => {
  const router = useRouter()
  const { id } = router.query
  const [list, setList] = useState(". . .")

  const getNotify = async (id) => {
    if (id === undefined) return
    const baseurl = "http://localhost:8080"
    const notify = await fetch(`${baseurl}/${id}`)
      .then(response => response.json());
    setList(notify.messageList);
  }

  setInterval(() => { getNotify(id) }, 1000);
  return (
    <div className="App">
      <div className="hero">
        <h1>ID: {id}</h1>
        <h1>{list}</h1>
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
  )
}

export default View