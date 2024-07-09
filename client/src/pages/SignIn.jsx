import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux'
import { signInStart , signInFail , signInSuccess } from '../redux/user/user.slice';



const SignIn = () => {
  const [form, setForm] = useState({});

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, loading } = useSelector((state) => state.user)

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  };

 const handleSubmit =async(e)=>{
  e.preventDefault()
  try {
   
    dispatch(signInStart())
    const res =await fetch('http://localhost:3000/api/signin',{
      method:'POST',
      headers:{
      'Content-Type': 'application/json'
      },
      body:JSON.stringify(form),
      credentials:'include'
    })
    const data =await res.json()
    
    if(data.success===false){
     dispatch(signInFail(data.message))
      return;
    }
    dispatch(signInSuccess(data))
    navigate('/')
    
  } catch (error) {
    dispatch(signInFail(error.message))
  }

 }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-black mb-8">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            {loading?'Loading...':'SignIn'}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        
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
