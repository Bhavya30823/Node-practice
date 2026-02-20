const users = [
  { id: 1, email: "user1@test.com", password: "1234" },
  { id: 2, email: "user2@test.com", password: "1234" }
];


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