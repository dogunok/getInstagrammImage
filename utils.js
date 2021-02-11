const fs = require('fs');
const fsExtra = require('fs-extra');
const config = require('./config.json');

const dirUsers = './users';


const writeFile = (user, newValue) => {
  console.log('сделал запись')
  const fileName = `${dirUsers}/${user}.json`
  const users = require(fileName)

  users.token_next_page = newValue;

  fs.writeFile(fileName, JSON.stringify(users), (err) => {
    if (err) return console.log(err);
  });
}

const createDir = (userId) => {
  console.log('createDir')
  fs.mkdir(dirUsers, (err) => {
    if (err) return console.log(err)
    createFile(userId)
    console.log('создал директорию')
  })
}

const checkFile = (userId) => {
  console.log('checkFile')
  fs.access(dirUsers, (err) => err ? createDir(userId) : createFile(userId))
}

const createFile = (userId) => {
    console.log('создаем файл')
    fs.writeFile(`${dirUsers}/${userId}.json`,"{}", (err) => {
      if (err) return console.log(err);
    });
}

const deleteFile = (userId) => {
  fsExtra.remove(dirUsers).then(() => {
    createDir(userId)
  }).catch(err => {
    console.error(err)
  })
}

const getSizeFile = (userId) => {
  fs.stat(dirUsers, (err, stats) => {
    console.log('Проверяем размер файла')
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



module.exports = { writeFile, getSizeFile, checkFile }

// "token_alex":"IGQVJVTWQyU0RNMkFDVUFaTWljSG4wUXBpem1pM25xNEdOZA0lLbDl5QjRyclRMVGc0TmtKa3JraXR4cFItN1l1eHdBWEZArVGNTR1hVaFRxalRqZAWhqNnpIdzl5OUFaS1g4bTU4UmhHek9JZAGpmZAVhDbQZDZD",
// token -IGQVJVMkEtWmZAVYWpwTEJ3V3NwRWVpcU9MY2F1aG9QNjFvTFpKSWJhUmVMSG1BazdRUE1QZA084eEIyTWRLTTAtQkhVclFlLWRRc0RCWXFtTUdnOWdUdXRWMXl0RXFIVkNieURNODZA3
