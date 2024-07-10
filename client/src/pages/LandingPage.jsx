import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="container mx-auto p-6 flex flex-col md:flex-row items-center">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
            Manage Your Tasks Efficiently
          </h1>
          <p className="text-lg md:text-xl text-blue-700 mb-6">
            Stay organized and boost your productivity with our easy-to-use task management tool.
          </p>
         
          <Link to='/register' className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Get Started
          </Link>
        </div>
        <div className="flex-1 mt-6 md:mt-0 md:ml-6">
          <img
            src="https://img.freepik.com/premium-vector/task-management-abstract-concept-vector-illustration_107173-25705.jpg?w=740"
            alt="Task Management"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
