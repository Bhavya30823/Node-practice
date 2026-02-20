const users = [
  { id: 1, email: "user1@test.com", password: "1234" },
  { id: 2, email: "user2@test.com", password: "1234" }
];


function findByEmail(email) {
  return users.find(user => user.email === email);
}

function createUser(email, password) {
  const user = { id: users.length + 1, email, password };
  users.push(user);
  return user;
}

module.exports = {
  findByEmail,
  createUser
};