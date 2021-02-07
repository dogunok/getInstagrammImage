const fetch = require('node-fetch');
const config = require('./config.json');

const token = config.token;


const router = app => {
    app.get(`/`, (req, res) => {
      console.log('ручка главной страницы')
      fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${token}`)
        .then(res => res.json())
        .then(object => res.send(object))
    });

    app.get('/media', (req, res) => {
      console.log('ручка запросов')
      fetch(`https://graph.instagram.com/me/media?limit=50&fields=media_url&access_token=${token}`)
        .then(res => res.json())
        .then(object => res.send(object))
    })
}

module.exports = router;
