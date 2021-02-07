const fs = require('fs');
const fileName = './users.json'
const users = require(fileName);


module.exports = function writeFile(user, newValue) {
  users[user] = newValue;

  fs.writeFile(fileName, JSON.stringify(users), (err) => {
    if (err) return console.log(err);
    // console.log(JSON.stringify(users));
    // console.log('writing to ' + fileName);
  });
}
