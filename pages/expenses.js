import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import React, { useState } from "react";


export default function Home({ isConnected }) {
  const [fecha, setFecha] = useState("");
  const [person, setPerson] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
    
  const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
  
  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    // set the date
    // let date = new Date();
    await fetch(NEXT_URL+"/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        fecha: fecha,
        person: person,
        category: category,
        amount: amount,
        comments: comments,
      }),
    }).then(async res => {
      console.log("💰 expense was sent!");
      
      // clean all fields after submitting
      setFecha("");
      setPerson("");
      setCategory("");
      setAmount("");
      setComments("");
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
        {/* <h1 className="title">
          Expenses
        </h1> */}

        {isConnected ? (
          <h2 className="subtitle">...is connected! ✅</h2>
        ) : (
          <h2 className="subtitle">
            No connection ❌
          </h2>
        )}

        {/* <h2 className="subtitle">How are you doing? 😇</h2> */}
        <form style={{ width: '100%', display: 'block' }} onSubmit={submitForm}>
        
          {/* Fecha */}    
          <input
            type="date"
            id="fecha"
            value={fecha}
            name="fecha"
            style={{ width: '100%', minHeight: '50px', marginBottom: 10, display: 'block' }}
            onChange={(e) => setFecha(e.target.value)}
          />

          

          {/* Person */}   
          <select
            name="person"
            onChange={(e) => setPerson(e.target.value)}
            style={{ width: '100%', minHeight: '50px', marginBottom: 10, display: 'block' }}
            id="person"
            value={person}
          >
            <option value="default" default>🤔 Who?</option>
            <option value="coni">🙋🏻‍♀️ Coni</option>
            <option value="daniel">👨‍💻 Daniel</option>
            
          </select>

          {/* Categories */}   
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', minHeight: '50px', marginBottom: 10, display: 'block' }}
            id="category"
            value={category}
          >
            <option value="default" default>🏢 What?</option>
            <option value="supermercado">Supermercado</option>
            <option value="verduleria">Verduleria</option>
            <option value="carniceria">Carniceria</option>
            <option value="diarco">Diarco</option>
            <option value="expensas">Expensas</option>
            <option value="aysa">AYSA</option>
            <option value="metrogas">Metrogas</option>
            <option value="edenor">Edenor</option>
            <option value="osde">OSDE</option>
            <option value="iplan">IPLAN</option>
            <option value="nafta">Nafta</option>
            <option value="farmacia">Farmacia</option>
            <option value="viajes">Viajes</option>
            <option value="salidas">Salidas</option>
            <option value="bruno">Bruno</option>
            <option value="bruno-ropa">Bruno-Ropa</option>
            <option value="bruno-salud">Bruno-Salud</option>
            <option value="bruno-saludas">Bruno-Salidas</option>
            <option value="otros">Otros</option>
          </select>
          
          {/* Amount */}   
          <input
            type="number"
            id="amount"
            value={amount}
            name="amount"
            min="1" 
            style={{ width: '100%', minHeight: '50px', marginBottom: 10, display: 'block' }}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Comments */}    
          <textarea
            className="mediumfont"
            name="content"
            type="text"
            value={comments}
            style={{ width: '100%', minHeight: '50px', marginBottom: 10, display: 'block' }}
            placeholder='Enter message...'
            onChange={(e) => setComments(e.target.value)}
          />

          {/* Send button */}    
          <button
            className="bigfont"
            style={{ width: '100%', display: 'block' }}
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? "Sending..." : "📩 Save expense! 📩"}
          </button>
        </form>
      </main>

      {/* <footer>
        "I solemnly swear that I am up to no good"
      </footer> */}

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
  )
}

export async function getServerSideProps(context) {
  try {
    await clientPromise
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
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
