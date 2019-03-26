import cron from 'node-cron';
import { runCron } from './scraper'

https://github.com/node-cron/node-cron
http://corntab.com/
cron.schedule('*/5 * * * *', () => { // Every 30 minutes
    console.log('Cron is starting up ...');
    runCron();
    console.log('Cron has completed. Shutting down.');
});