import express from 'express';
import cors from 'cors';
import logtimestamp from 'log-timestamp';
import { uniqueCount } from './lib/utils'
import {
    getInstagramCount, 
    getTwitterCount
 } from './lib/scraper';
import db from './lib/db';
import './lib/cron'; // by simply importing the file, it will make the cron kick off.

require('log-timestamp');

const app = express();
app.use(cors());

app.get('/scrape', async (req, res, next) => {
    console.log('Commence Scraping...!');
    const instagramUsername = 'makingbigbank';
    const twitterUsername = 'snarkosaurous';

    const [instagramCount, twitterCount] = await Promise.all([
        getInstagramCount(instagramUsername), 
        getTwitterCount(twitterUsername)
    ]);
    
    console.log('Done Scraping!!');
    
    res.json({instagramCount, twitterCount});
});

app.get('/data', async (req, res, next) => {
    // get the scrape data
    // For performance, use .value() instead of .write() if you're only reading from db
    // grab everything and send it for now ... filter in the future
    const { twitter, instagram } = db.value();

    // filter for only unique values
    const uniqueTwitter = uniqueCount(twitter);
    const uniqueInstagram = uniqueCount(instagram);

    // respond with json
    res.json({ twitter: uniqueTwitter, instagram: uniqueInstagram });
});

var server = app.listen(2093, () => {
    console.log(`Example App running on port http://localhost:${server.address().port}`);
});

// async function go() {
//     const instagramUsername = 'aaronburbach2016';
//     const twitterUsername = 'aburbach14';

//     const [instagramCount, twitterCount] = await Promise.all([
//         getInstagramCount(instagramUsername), 
//         getTwitterCount(twitterUsername)
//     ]);
   
//     console.log(`${instagramUsername} has ${instagramCount} Instagram followers!`);
//     console.log(`${twitterUsername} has ${twitterCount} Twitter followers!`);
// } 

// go();