import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head";

import MeetupDetail from "@/components/meetups/MeetupDetail";


const MeetupDetails = (props) => { 
   
    return (
        <>
             <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description'
                        content={props.meetupData.description}/>
            </Head>
            <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}/>
         </>
    );
}
export async function getStaticPaths () {

    const client =  await MongoClient.connect('mongodb+srv://artem:ihPks3BMxkNeFFLe@cluster0.jmetlm6.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}})),
    };
};

export async function getStaticProps (context) {
    // fetch data for meetup 
    const meetupId = context.params.meetupId;

    const client =  await MongoClient.connect('mongodb+srv://artem:ihPks3BMxkNeFFLe@cluster0.jmetlm6.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId)
    });

    client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.data.image,
                title: selectedMeetup.data.title,
                address: selectedMeetup.data.address,
                description: selectedMeetup.data.description,
            },
        }
    };
};

export default MeetupDetails;