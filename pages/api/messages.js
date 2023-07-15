import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("gasparindb");

        const messages = await db
            .collection("messages")
            .find({})
            .sort({ metacritic: -1 })
            // .limit(10)
            .toArray();

        res.json(messages);
    } catch (e) {
        console.error(e);
    }
}