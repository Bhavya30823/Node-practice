const taskRepository = require("../repositories/taskRepository");

function createTask(title, userEmail, status) {
    return taskRepository.createTask(title, userEmail, status);    
}

function getTasksForUser(userEmail) {
    return taskRepository.getTasks().filter(task => task.userEmail === userEmail);
}

function deleteTask(taskId, userEmail) {
    const task = taskRepository.findTaskById(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    if (task.userEmail !== userEmail) {
        throw new Error("Unauthorized");
    }
    taskRepository.deleteTask(taskId);
}

function updateTask(taskId, userEmail) {
    const task = taskRepository.findTaskById(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    if (task.userEmail !== userEmail) {
        throw new Error("Unauthorized");
    }
    return taskRepository.updateTask(taskId, status === "pending" ? { status: "completed" } : { status: "pending" });
}
module.exports = {
    createTask,
    getTasksForUser,
    deleteTask,
    updateTask
};