const fs = require('fs');
const fsExtra = require('fs-extra');

const config = require('./config.json');

const dirUsers = './users';


const writeFile = (user, newValue) => {
  const fileName = `${dirUsers}/${user}.json`
  const users = require(fileName)

  users.token_next_page = newValue;

  fs.writeFile(fileName, JSON.stringify(users), (err) => {
    console.log(`writeFile - ${user}`)
    if (err) return console.log(err);
  });
}

const createDir = (userId) => {
  fs.mkdir(dirUsers, (err) => {
    if (err) return console.log(err)
    createFile(userId)
    console.log('createDir')
  })
}

const checkFile = (userId) => {
  fs.access(dirUsers, (err) => err ? createDir(userId) : createFile(userId))
}

const createFile = (userId) => {
    console.log(`createFile - ${userId}`)
    fs.writeFile(`${dirUsers}/${userId}.json`,"{}", (err) => {
      if (err) return console.log(err);
    });
}

const deleteFile = (userId) => {
  fsExtra.remove(dirUsers).then(() => {
    console.log('deleteFile')
    createDir(userId)
  }).catch(err => {
    console.error(err)
  })
}

const getSizeFile = (userId) => {
  fs.stat(dirUsers, (err, stats) => {
    console.log('getSizeFile')
    if (err) {
      console.log(err)
      createDir(userId)
      return
    }

    if(stats.size > config.max_size_users) {
      deleteFile(userId)
      return
    }

    checkFile(userId);
  })
}

const excludeMedia = (object) => {
  const newArrData = object.data.filter(item => {
    return !item.caption.toLowerCase().match(config.excludeTheWord)
  })

  object.data = newArrData;

  return object;
}


module.exports = { writeFile, getSizeFile, excludeMedia }
