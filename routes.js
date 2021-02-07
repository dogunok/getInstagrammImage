const fetch = require('node-fetch');
const config = require('./config.json');
const users = require('./users.json');

const token = config.token;
const limit = config.limit_image;

const writeFile = require('./utils');


const router = app => {
    app.get(`/`, (req, res) => {
      console.log('ручка главной страницы')
      fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${token}`)
        .then(res => res.json())
        .then(object => {
          return res.send(object)
        })
    });

    app.get('/media/:userId', (req, res) => {
      console.log('ручка запросов')
      fetch(`https://graph.instagram.com/me/media?limit=${limit}&fields=media_url&access_token=${token}`)
      .then(res => res.json())
      .then(object => {
        if (object.paging.cursors) {
          writeFile(req.params.userId, object.paging.cursors.after)
        }
        return res.send(object)
      })
    })

    app.get('/media/next/:userId', (req, res) => {
      console.log('ручка next')

      fetch(`https://graph.instagram.com/me/media?limit=${limit}&fields=media_url&access_token=${token}&after=${users[req.params.userId]}`)
        .then(res => res.json())
        .then(object => {
          if (object.paging.cursors) {
            writeFile(req.params.userId, object.paging.cursors.after)
          }
          return res.send(object)
        })
    })
}


module.exports = router;
