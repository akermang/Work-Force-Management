const express = require("express");
const router = express.Router();
const FileUtils = require("./file-utils");
const fileUtils = new FileUtils();
var multer = require("multer");
var upload = multer();
var fs = require('fs')

/**
 * Mock data
 */
const mockData = require("../mock/data.json");
let mockTokens = require("../mock/tokens.json");
let mockUsers = require("../mock/users.json");

/**
 * Api routes
 */
router.get("/", (req, res) => {
  send(res, { statusCode: 200, data: mockData });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = getUser(username, password);
  
  if (user) {
    setUserSession(user.token);
    send(res, { statusCode: 200, loggedInUser: user });
  } else {
    send(res, { statusCode: 400, data: null });
  }
});

router.post("/auth", (req, res) => {
  let statusCode;
  let user;
  const token = req.body.token;
  if (mockTokens[token]) {
    user = getUserByToken(token);
    send(res, { statusCode: 200, loggedInUser: user });
  } else {
    send(res, { statusCode: 401, error: "authentication failed" });
  }
});

router.post("/user/add/", (req, res) => {

  const files = req.files || {};
  const avatar = files.avatar;
  const user = req.body;
  const newUser = setdefaultCredentials(user);
  console.log(req)

  if(!newUser) {
    return res.send({ statusCode: 400, error: 'username already exists' });
  }
  
  if(avatar) {
    const filePath = "/assets/images/" + req.files.avatar.name; 
    const uploaded = uploadFile(req.files.avatar, filePath, res);
    newUser.avatar = filePath;
  }  
  addUser(newUser);
  
  return res.send({ statusCode: 200, user: user })
});

function uploadFile(file, path, res) {
  file.mv(path, function(err) {
    if (err)
      return new Error('failed to upload file');
  });
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
  if(!lastUser) return 1;  
  let newToken = ++lastUser.token ;
  return newToken ;
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
  res.send(data);
}


module.exports = router;
