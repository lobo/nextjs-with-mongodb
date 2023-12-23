import clientPromise from "../../lib/mongodb";
import moment from "moment";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("gasparindb");
    switch (req.method) {
      case "POST":
        let bodyObject = JSON.parse(req.body);
        var fecha = moment(bodyObject.date);
        bodyObject.date = fecha.format("MMMM Do YYYY, h:mm:ss a");
        console.log(bodyObject);
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
};
