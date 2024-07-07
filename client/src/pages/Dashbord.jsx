import React, { useState } from 'react';
import Task from '../components/Task';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row h-screen bg-slate-700">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:flex flex-col bg-slate-900 max-w-xs m-8 rounded p-10 mx-10 justify-between transition-transform duration-300 ease-in-out`}
      >
        <button className="text-white absolute right-4 top-4 md:hidden" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button>
        <div className="flex items-center gap-2 text-white mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
              <img className="w-full h-full object-cover" src="" alt="User" />
            </div>
          </div>
          <span className="text-white">userName</span>
        </div>

        <ul className="flex flex-col gap-3 text-white mb-4">
          <li className="bg-slate-800 p-2 rounded hover:bg-slate-700 cursor-pointer">All Tasks</li>
          <Link to="/completed">
            <li className="bg-slate-800 p-2 rounded hover:bg-slate-700 cursor-pointer">Completed</li>
          </Link>
          <Link to="/doitnow">
            <li className="bg-slate-800 p-2 rounded hover:bg-slate-700 cursor-pointer">Do it Now</li>
          </Link>
        </ul>

        <div>
          <span className="text-white cursor-pointer hover:underline">Sign Out</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-900 m-8 rounded p-10 mx-10 relative">
        {/* Sidebar Toggle Button for Small Screens */}
        <button className="text-white md:hidden absolute top-4 right-4" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className="flex justify-between items-center text-white mb-4">
          <span className="text-xl font-bold">All Tasks</span>
          <div className="bg-slate-950 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-slate-800">
            +
          </div>
        </div>

        <div className="mt-4">
          <Task />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
