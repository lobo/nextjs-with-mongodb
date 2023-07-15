import clientPromise from "../lib/mongodb";

export default function Messages({ messages }) {
    return (
        <div>
            <h1>All messages</h1>
            <ul>
                {messages.map((msj) => (
                    <li>
                        {/* <h2>{msj.title}</h2>
                        <h3>{msj.metacritic}</h3>
                        <p>{msj.plot}</p> */}
                        <p>{msj.content}</p>
                    </li>
                ))}
            </ul>
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
            // .sort({ metacritic: -1 })
            // .limit(20)
            .toArray();

        return {
            props: { messages: JSON.parse(JSON.stringify(messages)) },
        };
    } catch (e) {
        console.error(e);
    }
}
