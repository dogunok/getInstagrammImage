const fetch = require('node-fetch');
const config = require('./config.json');

const token = config.token_alex;
const limit = config.limit_image;

const { writeFile, getSizeFile } = require('./utils');


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
      getSizeFile(req.params.userId)
      fetch(`https://graph.instagram.com/me/media?limit=${limit}&fields=media_url,permalink&access_token=${token}`)
      .then(res => res.json())
      .then(object => {
        if (object.paging && object.paging.cursors) {
          writeFile(req.params.userId, object.paging.cursors.after)
        }
        return res.send(object)
      })
    })

    app.get('/media/next/:userId', (req, res) => {
      const users = require(`./users/${req.params.userId}.json`);

      console.log('ручка next')
      fetch(`https://graph.instagram.com/me/media?limit=${limit}&fields=media_url,permalink&access_token=${token}&after=${users.token_next_page}`)
        .then(res => res.json())
        .then(object => {
          if (object.paging && object.paging.cursors) {
            writeFile(req.params.userId, object.paging.cursors.after)
          }
          return res.send(object)
        })
    })
}


module.exports = router;
