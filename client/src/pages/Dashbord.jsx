import React, { useEffect, useState } from 'react';
import Tasks from '../components/Tasks';
import TaskForm from '../components/TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess, signOutFail, signOutStart } from '../redux/user/user.slice';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);


  //filter the user that need to be assigned 
  const filteredUsers = users.filter((user)=> user.id!=currentUser.id)

  // Fetch tasks and users
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`https://task-management-4fyb.onrender.com/api/getUserTasks?sort=${sortOrder}`, {
        credentials: 'include',
      });
      
    

      const data = await res.json();
      
      if (data.success === false) {
        console.log(data.message);
        setError(data.message)
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
      const res = await fetch('https://task-management-4fyb.onrender.com/api/getalluser');
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
      const res = await fetch('https://task-management-4fyb.onrender.com/api/signout');
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

  //fetch completed tasks 
  const handleCompletedTask = async () => {
    try {
      const res = await fetch(`https://task-management-4fyb.onrender.com/api/getUserTasks?status=true`, {
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success===false) {
        setError(data.message);
        return;
      } 
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error);
    }
  };

  //fetch pending tasks
  const handlePendingTask = async () => {
    try {
      const res = await fetch(`https://task-management-4fyb.onrender.com/api/getUserTasks?status=false`, {
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success===false) {
        setError(data.message);
        return;
      } 
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <span  className="text-2xl">👋</span>
              <h1 className="text-2xl font-bold">{`Hey, ${currentUser.username}`}</h1>
            </div>
            <div className='flex flex-col gap-1 sm:flex-row gap-2'>
              <button
                onClick={() => setShowTaskForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 "
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
            <button onClick={handleCompletedTask} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
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
                <Tasks task={task} key={task.id} fetchData={fetchData} filteredUsers={filteredUsers} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showTaskForm && <TaskForm mode={'create'} setShowTaskForm={setShowTaskForm} fetchData={fetchData}filteredUsers={filteredUsers} />}
    </>
  );
}

export default Dashboard;
