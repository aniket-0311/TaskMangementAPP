const Task = require("../model/Task");
const List = require("../model/List");


/* The req.user_id is getting set via the verify jwt token from headers! */

const getAllList = async (req, res) => {
  try {
    // Retrive all events data
    const allListData = await List.find({userId:req.user_id});
    if (!allListData) {
      return res.status(404).json({
        result: false,
        message: "No Data Found",
      });
    }
    return res.status(200).json({
      data: allListData,
      result: true,
      message: "Success",
    });
  } catch (err) {
    return res.status(500).json({
      result: false,
      message: "Internal server error",
    });
  }
};

const createList = async (req, res) => {
  try {
    const { list_name } = req.body;

    const listData = await List.create({
      list_name,
      userId: req.user_id
    });
    return res.status(201).json({
      data:listData,
      success: true,
      message: "List created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      result: false,
      message: "Internal server error",
    });
  }
};

const getList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({
        result: false,
        message: "No Data Found",
      });
    }
    return res.status(200).json({
      data: list,
      result: true,
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      result: false,
      message: "Internal server error",
    });
  }
};

const updateListById = async (req, res) => {
  try {
    const { id } = req.params;
    const { list_name } = req.body;

    // Check if list_name is provided in the request body
    if (!list_name) {
      return res.status(400).json({
        result: false,
        message: "List name is required",
      });
    }

    // Find the list by ID and update its list_name
    const updatedList = await List.findByIdAndUpdate(id, { list_name }, { new: true });

    // Check if the list with the provided ID exists
    if (!updatedList) {
      return res.status(404).json({
        result: false,
        message: "List not found",
      });
    }

    // Return the updated list
    return res.status(200).json({
      // data: updatedList,
      result: true,
      message: "List updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      result: false,
      message: "Internal server error",
    });
  }
};

const getTasksByListId = async (req, res) => {
  try {
    const tasks = await Task.find({ list_id: req.params.listId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTaskByListId = async (req, res) => {
  try {
    const { listId } = req.params;
    const { taskName } = req.body;
    const task = await Task.create({ list_id: listId, task_name: taskName });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTaskByListAndTaskId = async (req, res) => {
  try {
    const { listId, taskId } = req.params;
    const { completed,taskName } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, list_id: listId },
      { completed: completed, task_name:taskName },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteListById = async (req, res) => {
  try {
    const { listId } = req.params;
    await List.findByIdAndDelete(listId);

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTaskByListAndTaskId = async (req, res) => {
  try {
    const { listId, taskId } = req.params;
    await Task.findOneAndDelete({ _id: taskId, list_id: listId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllList,
  createList,
  getList,
  updateListById,
  getTasksByListId,
  createTaskByListId,
  updateTaskByListAndTaskId,
  deleteListById,
  deleteTaskByListAndTaskId
};
