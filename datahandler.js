const fs = require('fs');


function setAllCount(count) {

    file = "./data/UserCount.json";
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.count = count;
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  
  }
  
  function setUserMessageCount(count) {
  
    file = "./data/UserCount.json";
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.messagesend = count;
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  
  }
  
  function getUserMessageCount() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.messagesend;
  }
  
  function getUserVCallJoins() {
    let rawdata = fs.readFileSync('./data/UserCount.json');
    let userCount = JSON.parse(rawdata);
    return userCount.vcalljoins;
  }
  
  function setVCallJoins(count) {
  
    file = "./data/UserCount.json";
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.vcalljoins = count;
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  
  }
  const jsonFilePath = "./data/UserCount.json";
  const jsonMessageFilePath = "./data/Messages.json";
  
  function updateMessageCount(indexToChange, newValue) {
  
  
    fs.readFile(jsonMessageFilePath, 'utf8', (err, data) => {
      if (err) {
        return;
      }
  
      try {
        const jsonContent = JSON.parse(data);
  
        if (!Array.isArray(jsonContent.total_messages)) {
          return;
        }
  
        if (indexToChange < 0 || indexToChange >= jsonContent.total_messages.length) {
          return;
        }
  
        jsonContent.total_messages[indexToChange] = newValue;
  
        fs.writeFile(jsonMessageFilePath, JSON.stringify(jsonContent, null, 2), 'utf8', (err) => {
          if (err) {
            return;
          }
  
        });
      } catch (parseError) {
  
      }
    });
  }
  
  
  
  function updateUserCount(indexToChange, newValue) {
  
  
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        return;
      }
  
      try {
        const jsonContent = JSON.parse(data);
  
        if (!Array.isArray(jsonContent.UserCount)) {
          return;
        }
  
        if (indexToChange < 0 || indexToChange >= jsonContent.UserCount.length) {
          return;
        }
  
        jsonContent.UserCount[indexToChange] = newValue;
  
        fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), 'utf8', (err) => {
          if (err) {
            return;
          }
  
        });
      } catch (parseError) {
  
      }
    });
  }
  
  function updateUserJoins(indexToChange, newValue) {
    return new Promise((resolve, reject) => {
      fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
  
        try {
          const jsonContent = JSON.parse(data);
  
          if (!Array.isArray(jsonContent.Joins)) {
            reject(new Error("not an array"));
          }
  
          if (indexToChange < 0 || indexToChange >= jsonContent.Joins.length) {
            reject(new Error("Index error"));
          }
  
          jsonContent.Joins[indexToChange] = newValue;
  
          fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), 'utf8', (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
  
  function updateUserLeaves(indexToChange, newValue) {
    return new Promise((resolve, reject) => {
      fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }
  
        try {
          const jsonContent = JSON.parse(data);
  
          if (!Array.isArray(jsonContent.Leaves)) {
            reject(new Error("not an array"));
          }
  
          if (indexToChange < 0 || indexToChange >= jsonContent.Leaves.length) {
            reject(new Error("Index error"));
          }
  
          jsonContent.Leaves[indexToChange] = newValue;
  
          fs.writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2), 'utf8', (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
  
  function getJoinValueAtIndex(index) {
    return new Promise((resolve, reject) => {
      fs.readFile(jsonFilePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          let jsonData = JSON.parse(data);
          if (index >= 0 && index < jsonData.Joins.length) {
            resolve(jsonData.Joins[index]);
          } else {
            reject(new Error("Index error"));
          }
        }
      });
    });
  }
  
  function getLeaveValueIndex(index) {
    return new Promise((resolve, reject) => {
      fs.readFile(jsonFilePath, (err, data) => {
        if (err) reject(err);
        else {
          let jsonData = JSON.parse(data);
          if (index >= 0 && index < jsonData.Leaves.length) {
            resolve(jsonData.Leaves[index]);
          } else reject(new Error("Index error"))
        }
      })
    });
  }
  
  
  
  
  
  
  module.exports = {
     setAllCount,
     setUserMessageCount,
     getUserMessageCount,
     getUserVCallJoins,
     setVCallJoins,
     updateMessageCount,
     updateUserCount,
     updateUserJoins,
     updateUserLeaves,
     getJoinValueAtIndex,
     getLeaveValueIndex 
    }