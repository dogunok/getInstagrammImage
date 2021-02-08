const fs = require('fs');
const fsExtra = require('fs-extra');


const writeFile = (user, newValue) => {
  console.log('сделал запись')
  const fileName = `./users/${user}.json`
  const users = require(fileName)

  users.token_next_page = newValue;

  fs.writeFile(fileName, JSON.stringify(users), (err) => {
    if (err) return console.log(err);
  });
}

const createDir = (userId) => {
  fs.mkdir('./users', (err) => {
    if (err) return console.log(err)
    createFile(userId)
  })
}

const checkFile = (userId) => {
  fs.access('./users', (err) => err ? createDir(userId) : createFile(userId))
}

const createFile = (userId) => {
    console.log('создаем файл')
    fs.writeFile(`./users/${userId}.json`,"{}", (err) => {
      if (err) return console.log(err);
    });
}

const deleteFile = (userId) => {
  fsExtra.remove('./users').then(() => {
    createDir(userId)
  }).catch(err => {
    console.error(err)
  })
}

const getSizeFile = (userId) => {
  fs.stat('./users', (err, stats) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(stats.size)
    if(stats.size > 200) {
      deleteFile(userId)
      return
    }

    checkFile(userId);
  })
}



module.exports = { writeFile, getSizeFile, checkFile }
