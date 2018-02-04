const express = require("express");
const router = express.Router();
const FileUtils = require("./file-utils");
const fileUtils = new FileUtils();
var multer = require("multer");
var upload = multer();
var fs = require("fs");
var fire = require("../../src/fire");
// var admin = require("firebase-admin");
// var serviceAccount  = require('../../src/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "w-f-m-4f195.appspot.com"
// });

// var endpoints = require("../endpoints.js");

/**
 * Mock data
 */
const mockData = require("../mock/data.json");

/**
 * Api routes
 */
router.get("/", (req, res) => {
  send(res, { data: mockData });
});

router.get("/task", (req, res) => {
  let tasksRef = fire
    .database()
    .ref("tasks")
    .orderByValue();
  tasksRef.once("value", snapshot => {
    send(res.status(200), { tasks: snapshot });
    tasks = snapshot;
  });
});

router.post("/task/add", (req, res) => {
  const taskToAdd = req.body;

  let tasksRef = fire.database().ref("tasks");
  tasksRef.push(taskToAdd).then(
    tasksRef.once("value", snapshot => {
      send(res.status(200), { tasks: snapshot });
      tasks = snapshot;
    })
  );
});

router.post("/task/status/update", (req, res) => {
  const taskId = req.body.id;
  const status = req.body.status;
  updateTaskStatus(taskId, status);
  let tasksRef = fire
    .database()
    .ref("tasks")
    .orderByValue();
  tasksRef.once("value", snapshot => {
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
  const user = getUser(username, password, user => {
    if (user) {
      let userToken = user.token;
      let query = fire.database().ref("tokens/");
      query.child(userToken).update({
         userToken
      });
      send(res, { loggedInUser: user });
    } else {
      send(res.status(400, { data: null }));
    }
  });
});

router.post("/auth", (req, res) => {
  let statusCode;
  const token = req.body.token;
  if (token) {
    let query = fire.database().ref("tokens/");
    query.once("value").then(snapshot => {
      if (snapshot.val()[token].userToken == token) {
        getUserByToken(token, user => {
          send(res, { loggedInUser: user });
        });
      } else {
        send(res.status(401), {
          error: "authentication failed resson: Bad token"
        });
      }
    });
  } else {
    send(res.status(401), { error: "authentication failed resson: No token" });
  }

  // .cach(
  //   (snapshot)=> {
  //     console.log("eror snapshot: "+snapshot)
});

router.post("/user/add/", (req, res) => {
  const files = req.files || {};
  const avatar = files.avatar;
  const user = req.body;
  let newUser = null;
  let userObj = null;
  let userssRef = fire
    .database()
    .ref("users")
    .orderByValue();
  userssRef
    .once("value")
    .then(snapshot => {
      snapshot.forEach(data => {
        let obj = data.val();
        if (obj.username === user.username) {
          userObj = obj;
          return true;
        }
      });
    })
    .then(() => {
      if (!userObj) {
        user.password = "1234";       
       }
    })
    .then(()=>{
      let tokensRef = fire.database().ref("tokens").orderByValue();
      tokensRef.once("value", (tokens)=>{
        let newtoken = tokens.val().length+1
         user.token = newtoken;
         user.id  = newtoken
         newUser = user;
       })
       .then(()=>{
        if (!newUser) {
          return res.status(400).send({ error: "username already exists" });
        }else{ if (avatar) {
              const filePath = "assets/images/" + req.files.avatar.name;
              const uploaded = uploadFile(req.files.avatar, filePath, res);
              if (!uploaded)
                return res.send.status(400)({ error: "file failed to upload" });
              newUser.avatar = filePath;
            }}
      }).then(()=>{
        if(newUser){
          addUser(newUser);
          return res.send({ user: newUser })
        } 
      })
    })
    
    
});

function updateTaskStatus(key, status) {
  fire
    .database()
    .ref("tasks")
    .child(key)
    .update({ status: status });
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
  //   let avatarFile = file;
  //   let fileName = file.name;
  //   var storageRef = fire.storage().ref();
  //   var mountainImagesRef = storageRef.child("avatars/" + fileName);
  //   var uploadFile = mountainImagesRef.put(file);
  //   var downloadURL;
  //   uploadFile.on(
  //     "state_changed",
  //     function(snapshot) {},
  //     function(error) {},
  //     function() {
  //       // let fileKey = fire.database().ref("avatars/usersAvatarPath").push().key;
  //       downloadURL = uploadFile.snapshot.downloadURL;
  //       let updates = {};
  //       let postData = {
  //         url: downloadURL,
  //         name: fileName,
  //         user: "user.id galgal"
  //       };
  //       fire
  //         .database()
  //         .ref("avatars")
  //         .push(postData);
  //     }
  //   );
  //    return "success";
  // }

  file.mv(path, function(err) {
    if (err) return null;
  });
  return "success";
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

function getUser(username, password, callback) {
  let query = fire
    .database()
    .ref("users")
    .orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let obj = childSnapshot.val();
      if (obj.username === username && obj.password === password) {
        callback(obj);
        return true;
      }
    });
  });
}

//   let user =  data.val();
//   user.id = data.key;
//   tasksArray.push(task);
// });

// for (let user of mockUsers) {
//   if (user.username === username && user.password === password) {
//     return user;
//   }
// }

function addUser(user) {
  fire
    .database()
    .ref("users")
    .push(user);
  // const filePath = "./server/mock/users.json";
  // // read data from file
  // fileUtils.readFile(filePath, function(users) {
  //   const parsedUsers = JSON.parse(users);
  //   parsedUsers.push(user);
  //   // write data to file
  //   mockUsers = parsedUsers;
  //   fileUtils.writeFile(filePath, parsedUsers, function(data) {});
  // });
}

/**
 * Helper method
 */
function getUserByToken(token, callback) {
  let query = fire
    .database()
    .ref("users")
    .orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let obj = childSnapshot.val();
      if (obj.token == token) {
        callback(obj);
        return true;
      }
    });
  });
}

function send(res, data) {
  setTimeout(() => {
    res.send(data);
  }, 1);
}

module.exports = router;
