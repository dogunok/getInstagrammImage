const express = require('express');
const cors = require('cors');
const CronJob = require('cron').CronJob;
const greenExpress = require("greenlock-express");

const routes = require('./routes.js');
const config = require('./config.json');

const port = config.serverPort;
const app = express();


app.use(cors())
app.use(express.static('static'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app)

// const server = app.listen(port, '80-78-247-37.cloudvps.regruhosting.ru', err => {
//     if(err) throw console.log(`error - ${err}`)
//     console.log(`Server listening on port 80-78-247-37.cloudvps.regruhosting.ru:${server.address().port}`);
// });


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

app.use("/", function(req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("Hello, World!\n\n💚 🔒.js");
});

// DO NOT DO app.listen() unless we're testing this directly
if (require.main === module) {
    app.listen(3000);
}

app.get("/hello", function(req, res) {
  res.end("Hello, Encrypted World!");
});

greenExpress
  .init({
      packageRoot: __dirname,
      configDir: "./greenlock.d",

      maintainerEmail: "isamusev03@gmail.com",

      cluster: false
  })

  // Serves on 80 and 443
  // Get's SSL certificates magically!
  .serve(app);
