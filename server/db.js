const Enmap = require('enmap');
const argon2 = require('argon2');

const users = new Enmap('users');

users.defer.then(async () => {
  users.set('admin', {
    username: 'admin',
    password: await argon2.hash('password'),
    created: Date.now(),
    userType: 'admin',
    firstName: 'Admin',
    lastName: 'Istrator',
  });
});

const login = async (username, password) => {
  const user = users.get(username);
  if (!user) return false;
  if (!password) return false;
  return argon2.verify(user.password, password);
};

const newUser = async (data) => {
  if (users.has(data.username)) throw new Error(`User ${data.username} already exists!`);
  // console.log(data);
  const score = scorePassword(data.plainpw);
  if (score < 30) throw new Error('Your password is too weak, and cannot be used.');
  const hash = await argon2.hash(data.plainpw);
  delete data.plainpw;
  users.set(data.username, {
    ...data,
    created: Date.now(),
    password: hash,
  });
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

module.exports = {
  users,
  newUser,
  login,
};
