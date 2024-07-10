import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({});
  const [signUpError , setSignUpError]=useState(null)
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setSignUpError(null)
      try {
        const res =await fetch('https://task-management-4fyb.onrender.com/api/register',{
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
          setLoading(false)
           return;
        }
        console.log(signUpError)
        navigate('/signin')
        setLoading(false)
      } catch (error) {
        setSignUpError(error)
        setLoading(false)
      }

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="font-semibold text-center text-4xl text-black mb-8">Register</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
          required
            type="text"
            placeholder="Username"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="username"
            onChange={handleChange}
          />
          <input
          required
            type="email"
            placeholder="Email"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="email"
            onChange={handleChange}
          />
          <input
          required
            type="password"
            placeholder="Password"
            className="shadow appearance-none border border-gray-400 rounded w-full py-3 px-4 bg-white text-black leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800"
            id="password"
            onChange={handleChange}
          />
          <button disabled={loading}
            className="border p-3 rounded-lg bg-blue-600 text-white uppercase hover:bg-gray-600 transition duration-300 ease-in-out"
          >
           {loading?'Loading...':'Register'} 
          </button>
         
        </form>
        {signUpError && <div className="text-red-500 mt-4">{signUpError}</div>}
       
        
        <div className="flex mt-3 gap-1">
          <p className="text-gray-600">Have an Account?</p>
          <Link to="/signIn">
            <span className="text-blue-500">SignIn</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
