import cron from 'node-cron';
import { runCron } from './scraper'

https://github.com/node-cron/node-cron
http://corntab.com/
cron.schedule('* * * * *', () => { // Every minute at every 1 hours
    console.log('Cron is starting up ...');
    runCron();
    console.log('Cron has completed. Shutting down.');
});