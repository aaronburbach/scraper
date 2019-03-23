import { useContext } from 'react';
import { distanceInWords } from 'date-fns';
import { ScrapeContext } from './ScrapeContext';

export default function Data() {
    const { scrapes } = useContext(ScrapeContext);
    return (
        <div>
            <h2>Your Twitter Data: { scrapes.twitter.length }</h2>
            <ul>
                { scrapes.twitter.map(scrape => (
                    <li key={scrape.date}>
                        {scrape.count} - {distanceInWords(new Date(scrape.date), new Date())}
                    </li>
                )) }
            </ul>
            <h2>Your Instagram Data: { scrapes.instagram.length }</h2>
            <ul>
                { scrapes.instagram.map(scrape => (
                    <li key={scrape.date}>
                        {scrape.count} - {distanceInWords(new Date(scrape.date), new Date())}
                    </li>
                )) }
            </ul>
        </div>
    );
}