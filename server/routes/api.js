const express = require("express");
const router = express.Router();
const FileUtils = require("./file-utils");
const fileUtils = new FileUtils();
var fs = require("fs");
var fire = require("../../src/fire");

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
    .then(() => {
      let tokensRef = fire
        .database()
        .ref("tokens")
        .orderByValue();
      tokensRef
        .once("value", tokens => {
          let newtoken = tokens.val().length + 1;
          user.token = newtoken;
          user.id = newtoken;
          newUser = user;
        })
        .then(() => {
          if (!newUser) {
            return res.status(400).send({ error: "username already exists" });
          } else {
            if (avatar) {
              const filePath = "assets/images/" + req.files.avatar.name;
              const uploaded = uploadFile(req.files.avatar, filePath, res);
              if (!uploaded)
                return res.send.status(400)({ error: "file failed to upload" });
              newUser.avatar = filePath;
            }
          }
        })
        .then(() => {
          if (newUser) {
            addUser(newUser);
            return res.send({ user: newUser });
          }
        });
    });
});
/**
 * Helper method
 */

function updateTaskStatus(key, status) {
  fire
    .database()
    .ref("tasks")
    .child(key)
    .update({ status: status });
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

function addUser(user) {
  fire
    .database()
    .ref("users")
    .push(user);
}

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
