import { getHTML, getTwitterFollowers, getInstagramFollowers } from './lib/scraper';

async function go() {
    const instagramUsername = '';
    const twitterUsername = '';

    const instagramUrl = `https://www.instagram.com/${instagramUsername}`;
    const twitterUrl = `https://twitter.com/${twitterUsername}`;
    
    const instagramPromise = getHTML(instagramUrl);
    const twitterPromise = getHTML(twitterUrl);

    const [instagramHtml, twitterHtml] = await Promise.all([instagramPromise, twitterPromise]);

    const instagramFollowers = await getInstagramFollowers(instagramHtml);
    const twitterFollowersCount = await getTwitterFollowers(twitterHtml);
    
    console.log(`${instagramUsername} has ${instagramFollowers} Instagram followers!`);
    console.log(`${twitterUsername} has ${twitterFollowersCount} Twitter followers!`);
} 

go();