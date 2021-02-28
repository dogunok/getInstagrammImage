const express = require('express');
const CronJob = require('cron').CronJob;
const expressLogging = require('express-logging');
const logger = require('logops');

const routes = require('./routes.js');
const config = require('./config.json');

const port = config.serverPort;
const host = config.serverHost;
const app = express();


app.use(expressLogging(logger, {policy: 'params'}));

routes(app)

const server = app.listen(port, host, err => {
    if(err) throw console.log(`error - ${err}`)
    console.log(`Server listening on ${host}:${server.address().port}`);
});


const job = new CronJob('0 30 2 */20 * *', () => {
      fetch(`${updateHost}?grant_type=ig_refresh_token&access_token=${token}`)
      .then(res => res.json())
      .then(object => {
        config.token = object.access_token
        fs.writeFile('./config.json', JSON.stringify(config), (err) => {
          if (err) return console.log(err);
          return console.log('update successful');
        });
      });
});

job.start();
