import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-black mb-8">Sign In</h1>
        
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            onChange={handleChange}
          />
          <button
            className="border p-3 rounded-lg bg-blue-600 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>
        
        <div className="flex mt-3 gap-1">
          <p className="text-gray-600">Don't Have an Account?</p>
          <Link to="/Register">
            <span className="text-blue-500">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
