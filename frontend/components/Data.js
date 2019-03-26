import { useContext } from 'react';
import { ScrapeContext } from './ScrapeContext';
import Table from './Table';
import Chart from './Chart';

export default function Data() {
    const { scrapes, fetchScrapes } = useContext(ScrapeContext);
    return (
        <div>
            <button type="button" onClick={fetchScrapes}>
                Refresh Followers Count
            </button>
            <h2>PerformanceBeef Twitter Followers</h2>
            <Chart scrapes={ scrapes.twitter } />
            <Table scrapes={ scrapes.twitter }></Table>
            
            <h2>PerformanceBeef Instagram Followers</h2>
            <Chart scrapes={ scrapes.instagram } />
            <Table scrapes={ scrapes.instagram }></Table>
        </div>
    );
}