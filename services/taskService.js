const taskRepository = require("../repositories/taskRepository");
const AppError = require("../errors/appError");

const allowedSortFields = ["userEmail", "title", "status"];
const allowedPriorityValues = ["low", "medium", "high"];
function createTask(title, userEmail, status, priority) {
    if (priority && !allowedPriorityValues.includes(priority)) {
        throw new AppError("Invalid priority value", 400);
    }
    return taskRepository.createTask(title, userEmail, status, priority);    
}

function getTasksForUser({userEmail, limit, offset, status, search, sort, order, priority}) {
    let tasks = taskRepository.getTasks();
    tasks = tasks.filter(task => task.userEmail === userEmail);
    if (status) tasks = tasks.filter(task => task.status === status);
    if (search) tasks = tasks.filter(task => task.title.includes(search));
    if (priority && allowedPriorityValues.includes(priority)) tasks = tasks.filter(task => task.priority === priority);
    // tasks = [...tasks].sort(...) to avoid mutating original array
    if (sort && allowedSortFields.includes(sort)) tasks = [...tasks].sort((a, b) => {
        if (order === "desc") {
            return b[sort] > a[sort] ? 1 : -1;
        } else {
            return a[sort] > b[sort] ? 1 : -1;
        }
    });
    return tasks.slice(offset, offset + limit);
//     SELECT *
// FROM tasks
// WHERE user_email = ?
// AND status = ?
// AND title LIKE CONCAT('%', ?, '%')
// ORDER BY created_at DESC
// LIMIT ? OFFSET ?;

    
}

function deleteTask(taskId, userEmail) {
    const task = taskRepository.findTaskById(taskId);
    if (!task) {
        throw new AppError("Task not found", 404);
    }
    if (task.userEmail !== userEmail) {
        throw new AppError("Unauthorized", 403);
    }
    taskRepository.deleteTask(taskId);
}

function updateTask(taskId, userEmail, updates) {
    const task = taskRepository.findTaskById(taskId);
    if (!task) {
        throw new AppError("Task not found", 404);
    }
    if (task.userEmail !== userEmail) {
        throw new AppError("Unauthorized", 403);
    }
    return taskRepository.updateTask(taskId, updates);
}
module.exports = {
    createTask,
    getTasksForUser,
    deleteTask,
    updateTask
};