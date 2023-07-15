import clientPromise from "../lib/mongodb";

export default function Messages({ messages }) {
    return (
        <div>
            <h1>All messages (newest on top)</h1>
            <ol>
                {messages.map((msj) => (
                    <li key={msj._id}>
                        {/* <h2>{msj.title}</h2> */}
                        <h3>🗓️ {msj.date}</h3>
                        {/* <p>{msj.date}</p> */}
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
            // .limit(20)
            .toArray();

        return {
            props: { messages: JSON.parse(JSON.stringify(messages)) },
        };
    } catch (e) {
        console.error(e);
    }
}
