const taskRepository = require("../repositories/taskRepository");

function createTask(title, userEmail, status) {
    return taskRepository.createTask(title, userEmail, status);    
}

function getTasksForUser(userEmail, limit, offset) {
    return taskRepository.getTasks()
        .filter(task => task.userEmail === userEmail)
        .slice(offset, offset + limit);
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

function updateTask(taskId, userEmail, status) {
    const task = taskRepository.findTaskById(taskId);
    if (!task) {
        throw new Error("Task not found");
    }
    if (task.userEmail !== userEmail) {
        throw new Error("Unauthorized");
    }
    return taskRepository.updateTask(taskId, status);
}
module.exports = {
    createTask,
    getTasksForUser,
    deleteTask,
    updateTask
};