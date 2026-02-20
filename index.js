const express = require("express");
const app = express();
const userService = require("./services/userService");
const taskService = require("./services/taskService");
const authMiddleware = require("./middlewares/authMiddleware");

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
const users = [];

app.post("/register", (req, res) => {
  try {
    const { email, password } = req.body; // object destructuring
    const result = userService.register(email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body; // object destructuring
    const result = userService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
app.post("/create-task", authMiddleware, (req, res) => {
  try {
    const { title, status } = req.body; // object destructuring
    const userEmail = req.user; 
    const result = taskService.createTask(title, userEmail.email, status);
    res.status(200).json({ message: "Task created successfully", task: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/get-tasks", authMiddleware, (req, res) => {
  try {
    const userEmail = req.user; 
    const result = taskService.getTasksForUser(userEmail.email);
    res.status(200).json({ message: "Tasks retrieved successfully", tasks: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/delete-task/:id", authMiddleware, (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const userEmail = req.user; 
    taskService.deleteTask(taskId, userEmail.email);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/update-task/:id", authMiddleware, (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const userEmail = req.user; 
    const result = taskService.updateTask(taskId, userEmail.email);
    res.status(200).json({ message: "Task updated successfully", task: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});