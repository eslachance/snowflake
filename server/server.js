const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session')
const cors = require('cors');
const { users, login, newUser, residences, packages } = require('./db.js');
const Enmap = require("enmap");

const convertEntriesToObject = (entries) => {
  const obj = {};
  for (let [key, value] of entries) {
    console.log(key + " = " + value)
    obj[key] = value;
    if(!obj[key].id) obj[key].id = key;
  }
  return obj;
}

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(cors());

const NedbStore = require('nedb-session-store')(session);
app.use(
  session({
    secret: 'Is this the real life, or is this just a fanta sea?',
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000   // e.g. 1 year
    },
    store: new NedbStore({
      filename: './data/ne.db'
    })
  })
);

const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.logged) {
    return res.status(401).json({ error: "Not Logged In" });
  }
  next();
}

const isAdmin = (req, res, next) => {
  if (!req.session || !req.session.logged) {
    return res.status(401).json({ error: "Not Logged In" });
  }
  if(!req.session || req.session.userType !== 'admin') {
    return res.status(401).json({ error: "GET THE fakkattahere" });
  }
  next();
}

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/users', isAdmin, (req, res) => {
  const residenceid = req.query.residence;
  let userData = new Enmap(users.entries());

  console.log('user filtering: ', residenceid);

  if (residenceid) {
    userData = userData.filter(user => user.residence === residenceid);
  }
  // still contains password, should be filtered out (duh)
  res.json(userData.array().map(u => ({...u, id: u.username})));
});

app.get('/users/:id', isAdmin, (req, res) => {
  const id = req.params.id;
  console.log("Requesting user ID: ", id);
  if(!id || !users.has(id)) {
    return res.status(404).json({"error": "user not found"});
  }
  console.log("getting user...");
  const user = users.get(id);
  delete user.password;
  console.log(user);
  res.json(user);
})

app.post('/users', isAdmin, (req, res) => {
  newUser({
    ...req.body,
    plainpw: req.body.password,
  });
  res.json({"ok": "ok"})
});

app.patch('/users', isAdmin, (req, res) => {
  // add udpate code
});

app.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) res.status(400).send("Missing Username or Password");
  let success = await login(req.body.username, req.body.password);
  if (success) {
    let user = users.get(req.body.username);
    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.userType = user.userType;
    req.session.name = `${user.firstName} ${user.lastName}`;
    req.session.save();
    console.log("SESSION SAVED: ", req.session, user)
    res.json({
      authenticated: true,
      username: req.body.username,
      admin: user.admin
    })
  } else {
    console.log("Authentication Failed");
    res.status(403).send("Nope. Not allowed, mate.");
  }
});

app.get('/me', async (req, res) => {
  console.log("Request for user data", req.session);

  if (!req.session || !req.session.logged) {
    console.log("No session or token");
    return res.json({authenticated: false , username: null, isAdmin: false});
  }
  const { session } = req;
  res.json({
    authenticated: true,
    username: session.username,
    isAdmin: session.userType === 'admin',
  });
});

app.get("/logout", isAuthenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(`Error destroying session: ${err}`);
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT || 3000}`)
})