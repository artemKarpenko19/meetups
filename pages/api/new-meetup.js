// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler (req, res) {
    if (req.method === "POST") {
        const data = req.body;
        
       const client =  await MongoClient.connect('mongodb+srv://artem:ihPks3BMxkNeFFLe@cluster0.jmetlm6.mongodb.net/meetups?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

       const db = client.db();

       const meetupsCollection = db.collection('meetups');
       console.log(meetupsCollection);
       const result = await meetupsCollection.insertOne({data});

       console.log(result);

       client.close();

       res.status(201).json({message: "Meetup inserted"});
    } else {
        console.log("Error");
    }
};


export default handler;