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
        bodyObject.saved_at = fecha.format("MMMM Do YYYY, h:mm:ss a");
        let newExpense = await db.collection("expenses").insertOne(bodyObject);
        // console.log(newExpense);
        res.json(newExpense);
        break;
      case "GET":
        const expenses = await db.collection("expenses").find({}).toArray();
        res.json({ status: 200, data: expenses });
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
