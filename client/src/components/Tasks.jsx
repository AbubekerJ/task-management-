import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import TaskForm from './TaskForm';

function Tasks({ task, fetchData, filteredUsers }) {
  const [isChecked, setIsChecked] = useState(task.status);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)

  const handleCheckboxChange = async (e, theTask) => {
    const updatedStatus = e.target.checked;
    try {
      setError(null)
     
      const res = await fetch(`https://task-management-4fyb.onrender.com/api/updateTask/${theTask}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: updatedStatus,
          assigned_to: task.assigned_to,
         
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
     setError(data.message)
        return;
      }
      console.log(data);
      setError(null)
      setIsChecked(updatedStatus); // Update local state first
      fetchData(); // Then fetch the updated data
    } catch (error) {
      setError(error.message)
    }
  };

  const handleDelete = async (theTask) => {
    try {
      setError(null)
      const res = await fetch(`https://task-management-4fyb.onrender.com/api/deleteTask/${theTask}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message)
        setError(data.message)
        return;
      }
      fetchData();
    } catch (error) {
      if (error.message.includes('getaddrinfo ENOTFOUND')) {
        setError('Unable to connect to the server. Please check your network connection and try again.');
      } else {
        setError('Internal Server Error, Make Sure you Are connected to the Internet');
      }
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <div className="flex justify-between items-center mb-4">
          <p className={`px-2 py-1 rounded ${isChecked ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {isChecked ? 'Completed' : 'Pending'}
          </p>
          <p className="text-gray-500">
           
            {task.assigned_to ? ' Assigned ' : '  Unassigned'}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={() => setShowTaskForm(true)} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(e, task.id)}
              className="form-checkbox"
            />
            <span>Complete</span>
          </label>
        </div>
        <p className="text-gray-400 mt-4 text-sm">Created at: {new Date(task.created_at).toLocaleString()}</p>
        <span className='text-red-800 text-sm' >{error?error:''}</span>
      </div>
      {showTaskForm && (
        <TaskForm mode={'edit'} setShowTaskForm={setShowTaskForm} task={task} fetchData={fetchData} filteredUsers={filteredUsers} />
      )}
    </>
  );
}

export default Tasks;
