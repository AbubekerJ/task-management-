import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({});
  const [signUpError , setSignUpError]=useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
      try {
        const res =await fetch('http://localhost:3000/api/register',{
          method:'POST',
          headers:{
          'Content-Type': 'application/json'
          },
          body:JSON.stringify(form)
        }
         
        )
        const data =await res.json()
        
        if(data.success===false){
          setSignUpError(data.message)
           return;
        }
        console.log(signUpError)
        navigate('/signin')
      } catch (error) {
        setSignUpError(error)
      }

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-black mb-8">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="password"
            onChange={handleChange}
          />
          <button
            className="border p-3 rounded-lg bg-blue-600 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out"
          >
            Register
          </button>
         
        </form>
        {signUpError && <div className="text-red-500 mt-4">{signUpError}</div>}
       
        
        <div className="flex mt-3 gap-1">
          <p className="text-gray-600">Have an Account?</p>
          <Link to="/signIn">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
