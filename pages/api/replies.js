import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("gasparindb");

        switch (req.method) {
            case "POST":
                let bodyObject = JSON.parse(req.body);
                let newReply = await db.collection("replies").insertOne(bodyObject);
                res.json(newReply);
                break;
            case "GET":
                const replies = await db.collection("replies").find({}).toArray();
                res.json({ status: 200, data: replies });
                break;
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};