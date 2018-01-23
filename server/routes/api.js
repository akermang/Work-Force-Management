const express = require("express");
const router = express.Router();
const FileUtils = require("./file-utils");
const fileUtils = new FileUtils();
var multer = require("multer");
var upload = multer();
var fs = require("fs");
var fire = require('../../src/fire');
// var endpoints = require("../endpoints.js");


/**
 * Mock data
 */
const mockData = require("../mock/data.json");
let mockTokens = require("../mock/tokens.json");
let mockUsers = require("../mock/users.json");
let tasks = require("../mock/tasks.json");


/**
 * Api routes
 */
router.get("/", (req, res) => {
  send(res, {  data: mockData });
});

router.get("/task", (req, res) => {
  let messagesRef = fire.database().ref("tasks").orderByValue();
  // let tasksArray = [];
  
  messagesRef.once("value", snapshot => {    
         
    // snapshot.forEach(function(data){
    //   let task =  data.val();
    //   task.id = data.key; 
    //   tasksArray.push(task);      
    // });

    send(res.status(200), { tasks: snapshot });
    tasks = snapshot;
  
  });  
  
});

router.post("/task/status/update", (req, res) => {
  const taskId = req.body.id;
  const status = req.body.status;
  updateTaskStatus(taskId, status);
  let messagesRef = fire.database().ref("tasks").orderByValue();
  messagesRef.once("value", snapshot => {
  send(res.status(200), { tasks: snapshot });
  tasks = snapshot;
  });
});

// router.get("/task", (req, res) => {
//   if (tasks) send(res.status(200), {  tasks });
//   else
//     send(res.status(404), {
//       statusCode: 404,
//       error: new Error("failed to get tasks")
//     });
// });

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = getUser(username, password);

  if (user) {
    setUserSession(user.token);
    send(res, {  loggedInUser: user });
  } else {
    send(res.status(400, { data: null }));
  }
});

router.post("/auth", (req, res) => {
  let statusCode;
  let user;
  const token = req.body.token;
  if (mockTokens[token]) {
    user = getUserByToken(token);
    send(res, {  loggedInUser: user });
  } else {
    send(res.status(401), { error: "authentication failed" });
  }
});

router.post("/user/add/", (req, res) => {
  const files = req.files || {};
  const avatar = files.avatar;
  const user = req.body;
  const newUser = setdefaultCredentials(user);

  if (!newUser) {
    return res.status(400).send({ error: "username already exists" });
  }

  if (avatar) {
    const filePath = "assets/images/" + req.files.avatar.name;
    const uploaded = uploadFile(req.files.avatar, filePath, res);
    if (!uploaded)
      return res.send.status(400)({ error: "file failed to upload" });
    newUser.avatar = filePath;
  }
  addUser(newUser);

  return res.send({  user: user });
});

function updateTaskStatus(id, status) {
  fire
      .database()
      .ref("tasks")
      .child(id)
      .update({ status: status});
  // for (task of tasks) {
  //   if (task.id == id) task.status = status;
  // }
  // const updatedTasks = tasks;
  // const filePath = "./server/mock/tasks.json";
  // fileUtils.readFile(filePath, function(atedTasks) {
  // // const parsedTasks = JSON.parse(updatedTasks);
  // fileUtils.writeFile(filePath, updatedTasks, function(data) {});
  // });
  return tasks;
}

function uploadFile(file, path, res) {
  file.mv(path, function(err) {
    if (err) return null;
  });
  return "success";
}

// MOCK! find real solution
function setdefaultCredentials(user) {
  if (userExists(user)) return;
  user.password = "1234";
  user.token = user.id = getNewToken();
  return user;
}

function userExists(user) {
  return mockUsers.filter(function(u) {
    return u.username === user.username;
  })[0];
}

function getNewToken() {
  let lastUser = mockUsers[mockUsers.length - 1];
  if (!lastUser) return 1;
  let newToken = ++lastUser.token;
  return newToken;
}

function getUser(username, password) {
  for (let user of mockUsers) {
    if (user.username === username && user.password === password) {
      return user;
    }
  }
}

function addUser(user) {
  const filePath = "./server/mock/users.json";
  // read data from file
  fileUtils.readFile(filePath, function(users) {
    const parsedUsers = JSON.parse(users);
    parsedUsers.push(user);
    // write data to file
    mockUsers = parsedUsers;
    fileUtils.writeFile(filePath, parsedUsers, function(data) {});
  });
}

function setUserSession(token) {
  const filePath = "./server/mock/tokens.json";
  // read data from file
  fileUtils.readFile(filePath, function(tokens) {
    const parsedTokens = JSON.parse(tokens);
    parsedTokens[token] = token;
    // write data to file
    mockTokens = parsedTokens;
    fileUtils.writeFile(filePath, parsedTokens, function(data) {});
  });
}

/**
 * Helper method
 */
function getUserByToken(token) {
  return mockUsers.filter(function(user) {
    return user.token == token;
  })[0];
}

function send(res, data) {
  setTimeout(() => {
    res.send(data);
  }, 1);
}

module.exports = router;
