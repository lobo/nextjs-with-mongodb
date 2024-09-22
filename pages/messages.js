import clientPromise from "../lib/mongodb";
import moment from "moment";

export default function Messages({ messages }) {
  // var new_messages = messages.map((msj) => {
  //     // console.log(msj.date);
  //     var fecha = moment(msj.date);
  //     msj.date = fecha.format('MMMM Do YYYY, h:mm:ss a');
  //     // console.log(msj);
  //     return msj;
  //  });

  return (
    <div>
      <h1>Latest messages on top</h1>
      <ol>
        {messages
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((msj) => (
            <li key={msj._id}>
              <h3>🗓️ {msj.date}</h3>
              <p>{msj.content}</p>
            </li>
          ))}
      </ol>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("gasparindb");

    const messages = await db
      .collection("messages")
      .find({})
      .sort({ date: -1 })
      .toArray();

    return {
      props: { messages: JSON.parse(JSON.stringify(messages)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { messages: [] },
    };
  }
}
