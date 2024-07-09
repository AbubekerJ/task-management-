import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TaskForm({ mode, setShowTaskForm, task, users , fetchData  }) {
  const { currentUser } = useSelector((state) => state.user);
  const editMode = mode === 'edit';
  const [formData, setFormData] = useState({
    title: editMode ? task.title : '',
    description: editMode ? task.description : '',
    status: editMode ? task.status : false,
    created_by: currentUser.id,
    assigned_to: editMode ? task.assigned_to : null,
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const res = await fetch(`http://localhost:3000/api/updateTask/${task.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        } else {
          console.log(data);
          fetchData();
          setShowTaskForm(false);
        }
      } else {
        const res = await fetch('http://localhost:3000/api/createtask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        } else {
          console.log(data);
          fetchData();
          setShowTaskForm(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{mode === 'edit' ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="assigned_to" className="block text-gray-700">Assign To</label>
            <select
              id="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={null}>Select a user</option>
              { users.length > 0 && users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowTaskForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {mode === 'edit' ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
