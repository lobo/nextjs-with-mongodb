import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("gasparindb");
        switch (req.method) {
          case "POST":
            let bodyObject = JSON.parse(req.body);
            let newMessage = await db.collection("messages").insertOne(bodyObject);
            // console.log(newMessage); 
            res.json(newMessage);
            break;
          case "GET":
            const messages = await db.collection("messages").find({}).toArray();
            res.json({ status: 200, data: messages });
            break;
        }
    } catch (e) {
        console.error(e);
    }
}