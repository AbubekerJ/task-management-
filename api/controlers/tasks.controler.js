
import pool from "../db.js";
import { createError } from "../utils/createError.js";



//Create task 



export const CreateTask=async(req, res ,next)=>{

  
    const { title, description, status, created_by, assigned_to } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, created_by, assigned_to, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *',
      [title, description, status, created_by, assigned_to]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}


//delete Task 


export const deleteTask = async (req, res, next) => {
  const { Taskid } = req.params;

  try {

    const taskQuery = await pool.query('SELECT * FROM tasks WHERE id = $1', [Taskid]);
    const task = taskQuery.rows[0];

    if (!task) {
      return next(createError(404, 'Task Not Found'));
    }

    if (req.user.id !== task.created_by) {
      return next(createError(401, 'You can only delete your task'));
    }

    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [Taskid]);

    if (result.rowCount === 0) {
      return next(createError(404, 'Task Not Found'));
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};



//update task
export const updateTask = async (req, res, next) => {
  const { Taskid } = req.params;
  const { title, description, status, assigned_to } = req.body;

  try {
    // Fetch the task to check the creator
    const taskQuery = await pool.query('SELECT * FROM tasks WHERE id = $1', [Taskid]);
    const task = taskQuery.rows[0];

    if (!task) {
      return next(createError(404, 'Task Not Found'));
    }

    // Check if the user is the creator of the task
    if (req.user.id !== task.created_by) {
      return next(createError(401, 'You can only update your task'));
    }

    // Proceed with updating the task if the user is authorized
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, assigned_to = $4 WHERE id = $5 RETURNING *',
      [title, description, status, assigned_to, Taskid]
    );

    if (result.rowCount === 0) {
      return next(createError(404, 'Task Not Found'));
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};



//get user task and assined task

export const getUserTasks = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE created_by = $1 OR assigned_to = $1',
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
