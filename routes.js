const fetch = require('node-fetch');
const cors = require('cors');

const {
  limit_image: limit,
  mediaHost,
  siteHost,
  fieldsParams
} = require('./config.json');

const config = require('./config.json');
const token = config.token;

const { writeFile, getSizeFile, excludeMedia } = require('./utils');

const corsOptions = {
  origin: siteHost,
  optionsSuccessStatus: 200
}


const router = app => {
  app.get('/media/:userId', cors(corsOptions), (req, res) => {
    getSizeFile(req.params.userId);
    fetch(`${mediaHost}?limit=${limit}&fields=${fieldsParams}&access_token=${token}`)
    .then(res => res.json())
    .then(object => {
      if (object.paging && object.paging.cursors) {
        writeFile(req.params.userId, object.paging.cursors.after);
      }

      return res.send(excludeMedia(object));
    });
  });

  app.get('/media/next/:userId', cors(corsOptions), (req, res) => {
    const users = require(`./users/${req.params.userId}.json`);
    fetch(`${mediaHost}?limit=${limit}&fields=${fieldsParams}&access_token=${token}&after=${users.token_next_page}`)
      .then(res => res.json())
      .then(object => {
        if (object.paging && object.paging.cursors) {
          writeFile(req.params.userId, object.paging.cursors.after);
        }
        return res.send(excludeMedia(object));
      });
  });
}


module.exports = router;
