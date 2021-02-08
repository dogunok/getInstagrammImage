const express = require('express');
const cors = require('cors');

const routes = require('./routes.js');
const config = require('./config.json');

const port = config.serverPort;
const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');

//   // authorized headers for preflight requests
//   // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   // next();

//   // app.options('*', (req, res) => {
//   //     // allowed XHR methods  
//   //     res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, DELETE, OPTIONS');
//   //     res.send();
//   // });
// });


app.use(cors())
app.use(express.static('static'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app)

const server = app.listen(port, err => {
    if(err) throw console.log(`error - ${err}`)
    console.log(`Server listening on port http://localhost:${server.address().port}`);
});

// var CronJob = require('cron').CronJob;
// var job = new CronJob('*/5 * * * * *', function() {
//   console.log('You will see this message every second');
// });
// job.start();
