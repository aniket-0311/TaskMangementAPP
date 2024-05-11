const router = require("express").Router();
const todoController = require("../controller/todoController")
const {authenticate} = require("../middleware/jwt");


router.get("/getAllList",authenticate, todoController.getAllList);
router.post("/create-list",authenticate, todoController.createList);
router.get("/list/:id",authenticate, todoController.getList);
router.put("/list/:id",authenticate, todoController.updateListById);
router.delete("/list/:listId",authenticate, todoController.deleteListById);

router.get("/list/:listId/tasks",authenticate, todoController.getTasksByListId);
router.post("/list/:listId/tasks",authenticate, todoController.createTaskByListId);
router.put("/list/:listId/tasks/:taskId",authenticate, todoController.updateTaskByListAndTaskId);
router.delete("/list/:listId/tasks/:taskId",authenticate, todoController.deleteTaskByListAndTaskId);

module.exports = router;