import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

export async function getHTML(url) {
    console.log('Fetching ... ' + url);
    try {
        const { data: html } = await axios.get(url);
        return html;
    } catch (e) {
        console.error('Error! --> ' + e);
        return 'Error!';
    }
}

export async function getTwitterFollowers(html) {
    try {
        // load up cheerio
        const $ = cheerio.load(html);
        const span = $('[data-nav="followers"] .ProfileNav-value');
        return span.data('count');
    } catch (e) {
        console.error('Error! --> ' + e);
        return 'Error!';
    }
}

export async function getInstagramFollowers(html) {
    try {
        // load up cheerio
        const $ = cheerio.load(html);
        const dataInString = $('script[type="application/ld+json"]').html();
        const pageObject = JSON.parse(dataInString);
        return parseInt(pageObject.mainEntityofPage.interactionStatistic.userInteractionCount);
    } catch (e) {
        console.error('Error! --> ' + e);
        return 'Error!';
    }
}

export async function getInstagramCount(username) {
    const url = `https://www.instagram.com/${username}`;
    const html = await getHTML(url);
    const followerCount = await getInstagramFollowers(html);
    return followerCount;
}

export async function getTwitterCount(username) {
    const url = `https://twitter.com/${username}`;
    const html = await getHTML(url);
    const followerCount = await getTwitterFollowers(html);
    return followerCount;
}

export async function runCron() {
    console.log('Commence Scraping...!');

    // const instagramUsername = 'makingbigbank';
    // const twitterUsername = 'snarkosaurous';
    const instagramUsername = 'performancebeef';
    const twitterUsername = 'PerformanceBeef';

    const [instagramCount, twitterCount] = await Promise.all([
        getInstagramCount(instagramUsername), 
        getTwitterCount(twitterUsername)
    ]);
   
    console.log(`${instagramUsername} has ${instagramCount} Instagram followers!`);
    console.log(`${twitterUsername} has ${twitterCount} Twitter followers!`);

    db.get('twitter')
        .push({
            date: Date.now(),
            username: twitterUsername,
            count: twitterCount
        })
        .write();
        
    db.get('instagram')
        .push({
            date: Date.now(),
            username: instagramUsername,
            count: instagramCount
        })
        .write();

    console.log('Done Scraping!!');
}