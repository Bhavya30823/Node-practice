const taskRepository = require("../repositories/taskRepository");

const allowedSortFields = ["userEmail", "title", "status"];
function createTask(title, userEmail, status) {
    return taskRepository.createTask(title, userEmail, status);    
}

function getTasksForUser({userEmail, limit, offset, status, search, sort, order}) {
    let tasks = taskRepository.getTasks();
    tasks = tasks.filter(task => task.userEmail === userEmail);
    if (status) tasks = tasks.filter(task => task.status === status);
    if (search) tasks = tasks.filter(task => task.title.includes(search));
    // tasks = [...tasks].sort(...) to avoid mutating original array
    if (sort && allowedSortFields.includes(sort)) tasks = [...tasks].sort((a, b) => {
        if (order === "desc") {
            return b[sort] > a[sort] ? 1 : -1;
        } else {
            return a[sort] > b[sort] ? 1 : -1;
        }
    });
    return tasks.slice(offset, offset + limit);
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