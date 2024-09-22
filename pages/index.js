import Head from "next/head";
import clientPromise from "../lib/mongodb";
import React, { useState } from "react";
import Link from "next/link";

export default function Home({ isConnected, latestTitle }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const NEXT_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();

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
          <h3 className="subtitle">...is connected! ✅</h3>
        ) : (
          <h3 className="subtitle">No connection ❌</h3>
        )}

        <p className="custom-title">{latestTitle || "Any message? :)"}</p>
        {/* <Link href="/edit-title">
          <a className="editLink">Edit Title</a>
        </Link> */}

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
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        .subtitle {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .editLink {
          margin-top: 1rem;
          color: #0070f3;
          text-decoration: underline;
          cursor: pointer;
        }
        .editLink:hover {
          color: #0051bb;
        }
        .mediumfont {
          font-size: 1.2rem;
        }
        .bigfont {
          font-size: 1.5rem;
          padding: 0.5rem;
          margin-top: 1rem;
        }
        .custom-title {
          font-size: 1.2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("gasparindb");

    const latestReply = await db.collection("replies").findOne({}, { sort: { date: -1 } });

    return {
      props: {
        isConnected: true,
        latestTitle: latestReply ? latestReply.title : null,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, latestTitle: null },
    };
  }
}

