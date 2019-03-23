import express from 'express';
import {
    getInstagramCount, 
    getTwitterCount
 } from './lib/scraper';
import db from './lib/db';
import './lib/cron'; // by simply importing the file, it will make the cron kick off.

const app = express();

app.get('/scrape', async (req, res, next) => {
    console.log('Commence Scraping...!');
    const instagramUsername = 'aaronburbach2016';
    const twitterUsername = 'aburbach14';

    const [instagramCount, twitterCount] = await Promise.all([
        getInstagramCount(instagramUsername), 
        getTwitterCount(twitterUsername)
    ]);
    
    console.log('Done Scraping!!');
    
    res.json({instagramCount, twitterCount});
});

var server = app.listen(2093, () => {
    console.log(`Example App running on port ${server.address().port}`);
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