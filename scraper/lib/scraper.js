import axios from 'axios';
import cheerio from 'cheerio';

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