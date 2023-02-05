//getMails.js
import { google } from 'googleapis';

import { getSession } from 'next-auth/react';


export default async function handler(req, res) {

    //get the access token from the session
    
    
    const session = await getSession({ req });
    const access_token = session.access_token;
   
  

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/api/auth/callback/google`
);





oauth2Client.setCredentials({
    
    access_token: access_token,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});


//if access token is expired, get a new one
if (oauth2Client.credentials.access_token === undefined) {
    const { tokens } = await oauth2Client.getAccessToken();
    oauth2Client.setCredentials(tokens);
}



//call the gmail api
const gmail = google.gmail({ version: "v1", auth: oauth2Client });
//get the user's email

//all the emails with body
const response = await gmail.users.messages.list({
    userId: 'me',
});
//get the id of the emails
const ids = response.data.messages.map((message) => message.id);
//get the body of the emails
//get the subject of the emails
const emails = await Promise.all(
    ids.map(async (id) => {
        const email = await gmail.users.messages.get({
            userId:'me',
            id: id,
            format: "full",
        });
        const subject = email.data.payload.headers.find(
            (header) => header.name === "Subject"
        ).value;

        const sender = email.data.payload.headers.find(
            (header) => header.name === "From"
        ).value;


        //get date and format it to dd/mm/yyyy
        const date = email.data.payload.headers.find(
            (header) => header.name === "Date"
        ).value;
        const date1 = new Date(date);
        const date2 = date1.getDate() + "/" + (date1.getMonth() + 1) + "/" + date1.getFullYear();


        //snippet is the body of the email
        const body = email.data.snippet;

       //get the url of first attachment image  
       

    
        return { subject, body,sender,date:date2 };
    })
);
//filter lost and found emails
const filteredEmails = emails.filter((email) => email.subject.includes("Lost")
|| email.subject.includes("Found") || email.subject.includes("lost") || email.subject.includes("found") || email.subject.includes("LOST") || email.subject.includes("FOUND") || email.subject.includes("Lost") || email.subject.includes("Found")
);
//send the filtered emails to the client
res.status(200).json(filteredEmails);
}