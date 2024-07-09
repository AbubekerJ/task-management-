import React, { useEffect, useState } from 'react';
import Tasks from '../components/Tasks';
import TaskForm from '../components/TaskForm';
import { useDispatch } from 'react-redux';
import { signOutSuccess, signOutFail, signOutStart } from '../redux/user/user.slice';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  // Fetch tasks and users
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/getUserTasks?sort=${sortOrder}`, {
        credentials: 'include',
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        console.log(data.message);
        setLoading(false);
        return;
      }

      setTasks(data.tasks || data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  
  // Fetch all users
  const getAllUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/getalluser');
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        setError(data.message);
        return;
      }

      console.log(data.users);
      setUsers(data.users);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    getAllUsers();
  }, [sortOrder]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('http://localhost:3000/api/signout');
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        dispatch(signOutFail(data.message));
        return;
      }

      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  //fetch completed task 
  const handleCompletedTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/getUserTasks?status=true`, {
        credentials: 'include'
      });
      const data = await res.json();
      
      if (res.ok) {
        setTasks(data);
      } else {
        // Handle unsuccessful response
        console.error('Failed to fetch tasks:', data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error);
    }
  };
  

  //fetch pendidng tasks
  const handlePendingTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/getUserTasks?status=false`, {
        credentials: 'include'
      });
      const data = await res.json();
      
      if (res.ok) {
        setTasks(data);
      } else {
        // Handle unsuccessful response
        console.error('Failed to fetch tasks:', data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error);
    }
  };
  

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div>
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-2"
              >
                Add Task
              </button>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="flex justify-end mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <button  onClick={handleCompletedTask} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
              Completed Tasks
            </button>
            <button onClick={handlePendingTask} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
              Pending Tasks
            </button>
          </div>

          {loading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <Tasks task={task} key={task.id} fetchData={fetchData} users={users} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showTaskForm && <TaskForm mode={'create'} setShowTaskForm={setShowTaskForm} fetchData={fetchData} users={users} />}
    </>
  );
}

export default Dashboard;
