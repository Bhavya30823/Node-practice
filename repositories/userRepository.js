const users = [];

function findByEmail(email) {
  return users.find(user => user.email === email);
}

function createUser(email, password) {
  users.push({ email, password });
}

module.exports = {
  findByEmail,
  createUser
};