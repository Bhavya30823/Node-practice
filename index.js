const express = require("express");
const app = express();
const userService = require("./services/userService");
const autgMiddleware = require("./middlewares/authMiddleware");
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
   res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body; // object destructuring
    const result = userService.login(email, password);
   res.status(200).json({ message: "Login successful", user: result});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});