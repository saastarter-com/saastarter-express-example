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
    res.send('This request was authentication by ' + req.user.email + '.')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});