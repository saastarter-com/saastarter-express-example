import {db} from './firebase.js';
import express from 'express';
import cors from 'cors';
import {authenticationRequired} from './auth-middleware.js';

const app = express();
app.use(cors({}))
const port = process.env.PORT || 8000

app.get('/', async (req, res) => {
    console.log('/ called. Trying to access Firestore.')
    try {
        await db.collection('users').get();
        res.send('Connection to FireStore was successful.')
        console.log(' -> FireStore access success.')
    } catch (e){
        res.send('Connection to Firestore failed. ' + e)
        console.log(' -> FireStore access failed.', e);
    }
});

app.get('/auth-required', authenticationRequired, async (req, res) => {
    // Only works if the user is authenticated with the authorization header.
    res.send('This request was authentication by ' + req.user.email + '. User uid: ' + req.user.uid);    
});

app.get('/subscriptions', authenticationRequired, async (req, res) => {
    // Returns all subscriptions saved in fireStore for the user.
    const subs = await db.collection('users').doc(req.user.uid).collection('subscriptions').get();
    if (subs.empty) {
        res.send('No subscriptions found for ' + req.user.email + '.');
        return;
    }
    const docs = subs.docs.map((doc) => doc.data());
    res.json(docs);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});