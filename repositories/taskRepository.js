let tasks = [
  { id: 1, title: "Task 1", userEmail: "user1@test.com", status: "pending" },
  { id: 2, title: "Task 2", userEmail: "user2@test.com", status: "completed" },
  { id: 3, title: "Task 3", userEmail: "user1@test.com", status: "pending" },
  { id: 4, title: "Task 4", userEmail: "user1@test.com", status: "in progress" },
  { id: 5, title: "Task 5", userEmail: "user1@test.com", status: "completed" }
];

function getTasks() {
  return tasks;
}

function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(title, userEmail, status, newTask) {
  const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
  newTask = { id: newId, title, userEmail, status }; // const newTask = {...}??
  tasks.push(newTask);
  return newTask;
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
}

function updateTask(id, updates) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
  }
  return null;
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  findTaskById
};