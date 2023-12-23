import Head from "next/head";
import clientPromise from "../lib/mongodb";
import React, { useState } from "react";

export default function Home({ isConnected }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const NEXT_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    // set the date
    let date = new Date();
    await fetch(NEXT_URL + "/api/messages", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        content: content,
      }),
    }).then(async (res) => {
      console.log("message was sent!");
      setContent("");
      setLoading(false);
    });
    // res = await res.json();

    // console.log("asdasdsa");
    // setContent("");
    // setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Wimpy Kid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Wimpy Kid</h1>

        {isConnected ? (
          <h2 className="subtitle">...is connected! ✅</h2>
        ) : (
          <h2 className="subtitle">No connection ❌</h2>
        )}

        <h2 className="subtitle">
          22 december: more messages received 🧚🏻 THANK YOU
        </h2>
        <h2 className="subtitle">
          💞 Try to relax and sleep well, love you very much 💞
        </h2>
        <h2 className="subtitle">ROCK NIGHT, ROCK THE NIGHT! 🎸</h2>
        <form style={{ width: "100%", display: "block" }} onSubmit={submitForm}>
          <textarea
            className="mediumfont"
            name="content"
            type="text"
            value={content}
            style={{ width: "100%", minHeight: "200px", display: "block" }}
            placeholder="Enter message..."
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="bigfont"
            style={{ width: "100%", display: "block" }}
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? "Sending..." : "Send! 🚀"}
          </button>
        </form>
      </main>

      <footer>"I solemnly swear that I am up to no good"</footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .mediumfont {
          line-height: 1;
          font-size: 1rem;
        }

        .bigfont {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 1rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        .textinput {
          float: left;
          width: 100%;
          min-height: 75px;
          outline: none;
          resize: none;
          border: 1px solid grey;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
