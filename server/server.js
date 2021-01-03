/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const Enmap = require('enmap');

const argon2 = require('argon2');

const users = new Enmap('users');
const posts = new Enmap('posts');

users.defer.then(async () => {
  users.ensure('admin', {
    username: 'admin',
    password: await argon2.hash('password'),
    created: Date.now(),
    edited: Date.now(),
    userType: 'admin',
    displayName: 'Administrator',
  });
});

posts.defer.then(async () => {
  posts.ensure('1', {
    id: 1,
    title: 'Test Post',
    contents:
      "Lorem ipsum blah blah we're all tired of seeing that fake latin shit.",
    author: 'admin',
    created: Date.now(),
    published: true,
    comments: [],
  });
});
const app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

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
      maxAge: 365 * 24 * 60 * 60 * 1000,
    },
    store: new NedbStore({
      filename: './data/ne.db',
    }),
  }),
);

const isAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.logged) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session || !req.session.logged) {
    return res.status(401).json({ error: 'Not Logged In' });
  }
  if (!req.session || req.session.userType !== 'admin') {
    return res.status(401).json({ error: 'GET THE fakkattahere' });
  }
  next();
};

app.get('/', (req, res) => {
  res.send('ok');
});

app.get('/users', isAdmin, (req, res) => {
  let userData = new Enmap(users.entries());
  // still contains password, should be filtered out (duh)
  res.json(userData.array().map((u) => ({ ...u, id: u.username })));
});

app.get('/users/:id', isAdmin, (req, res) => {
  const { id } = req.params;
  console.log('Requesting user ID: ', id);
  if (!id || !users.has(id)) {
    return res.status(404).json({ error: 'user not found' });
  }
  console.log('getting user...');
  const user = users.get(id);
  delete user.password;
  console.log(user);
  res.json(user);
});

app.post('/users', isAdmin, (req, res) => {
  newUser({
    ...req.body,
    plainpw: req.body.password,
  });
  res.json({ ok: 'ok' });
});

// eslint-disable-next-line no-unused-vars
app.patch('/users/:id', isAdmin, (req, res) => {
  // add udpate code
});

app.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password)
    res.status(400).send('Missing Username or Password');
  if (await login(req.body.username, req.body.password)) {
    const user = users.get(req.body.username);
    req.session.logged = true;
    req.session.username = req.body.username;
    req.session.userType = user.userType;
    req.session.displayName = user.displayName;
    req.session.save();
    console.log('SESSION SAVED: ', req.session, user);
    res.json({
      authenticated: true,
      username: req.body.username,
      admin: user.admin,
    });
  } else {
    console.log('Authentication Failed');
    res.status(403).send('Nope. Not allowed, mate.');
  }
});

app.get('/me', async (req, res) => {
  console.log('Request for user data', req.session);

  if (!req.session || !req.session.logged) {
    console.log('No session or token');
    return res.json({
      authenticated: false,
      username: null,
      isAdmin: false,
    });
  }
  const { session } = req;
  res.json({
    authenticated: true,
    username: session.username,
    displayName: session.displayName,
    isAdmin: session.userType === 'admin',
  });
});

app.post('/post', isAuthenticated, async (req, res) => {
  console.log('Creating new blog post...', req.body);
  if (!req?.body?.contents || !req?.body?.title) {
    return res.status(400).json({
      error: true,
      message: 'Missing post data',
    });
  }
  const result = await newPost(req.body);

  res.json(result);
});

app.get('/post/:id', (req, res) => {
  const { id } = req.params;
  res.json(posts.get(id));
});

app.get('/posts', (req, res) => {
  console.log('Getting all blog posts');
  res.json(convertEntriesToObject(posts.entries()));
});

app.get('/logout', isAuthenticated, (req, res) => {
  console.log('Loggin out...');
  req.session.destroy((err) => {
    if (err) console.log(`Error destroying session: ${err}`);
    console.log('Logged out');
    return res.json({
      authenticated: false,
      username: null,
      isAdmin: false,
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.PORT || 3000}`,
  );
});

// Utilities

const login = async (username, password) => {
  const user = users.get(username);
  if (!user || !password) return false;
  return argon2.verify(user.password, password);
};

const newUser = async (data) => {
  if (users.has(data.username))
    throw new Error(`User ${data.username} already exists!`);
  const score = scorePassword(data.plainpw);
  if (score < 30)
    throw new Error('Your password is too weak, and cannot be used.');
  const hash = await argon2.hash(data.plainpw);
  delete data.plainpw;
  users.set(data.username, {
    ...data,
    created: Date.now(),
    password: hash,
  });
};

const newPost = async (data) => {
  const id = posts.autonum;
  posts.set(id, {
    ...data,
    id,
    created: Date.now(),
  });
  return {
    ok: 'ok',
    id,
  };
};

const convertEntriesToObject = (entries) => {
  const obj = {};
  for (let [key, value] of entries) {
    obj[key] = value;
    if (!obj[key].id) obj[key].id = key;
  }
  return obj;
};

// https://stackoverflow.com/questions/948172/password-strength-meter
function scorePassword(pass) {
  let score = 0;
  if (!pass) {
    return score;
  }

  // award every unique letter until 5 repetitions
  const letters = {};
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1;
    score += 5.0 / letters[pass[i]];
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass),
  };

  let variationCount = 0;
  for (const check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}
