import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from 'react-router';
import OAuth from '../components/OAuth';
const SignUp = () => {
  const [formData,setFormData]=useState({
    fullName:'',
    email:'',
    password:''
  });
  const [showPassword,setShowPassword]=useState(false)
  const {email,password,fullName}=formData;
  function onChange(e){
    setFormData((preState)=>({
      ...preState,
      [e.target.id]:e.target.value,
    }))
  }
  return (
    <section>
      <h1 className='text-center text-3xl font-bold mt-6'>Sign In</h1>
      <div className='mx-auto flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl'>
        <div className='w-full md:w-[67%] lg:w-[50%]'>
          <img className='rounded-lg w-full' src="https://plus.unsplash.com/premium_photo-1693842703126-6337dd42bf32?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
          <input  className=" w-full mt-4 md:mt-6 lg:mt-0 form-input rounded text-xl bg-white text-gray-700 px-4 py-3 transistion ease-in-out border-gray-300" type='text' id='fullName' 
            value={fullName} onChange={onChange} placeholder='Full Name' />
            <input  className=" w-full mt-3  form-input rounded text-xl bg-white text-gray-700 px-4 py-3 transistion ease-in-out border-gray-300" type='email' id='email' 
            value={email} onChange={onChange} placeholder='Email Adress' />
            <div className=" relative  mt-3 ">
              <input   
                 className='w-full  form-input rounded text-xl bg-white text-gray-700 px-4 py-3 transistion ease-in-out border-gray-300'
                 type={showPassword ? 'text' : 'password'}
                 id='password' 
                 value={password}
                 onChange={onChange} 
                 placeholder='Password' />
                 {
                  showPassword ? <FaRegEye className='cursor-pointer absolute right-3 top-4 text-xl' onClick={()=>{setShowPassword(!showPassword)}} /> 
                  : <FaEyeSlash className='cursor-pointer absolute right-3 top-4 text-xl' onClick={()=>{setShowPassword(!showPassword)}} />
                 }
            </div>
            <div className='flex items-center justify-between whitespace-nowrap mt-2 text-sm sm:text-md'>
              <p className='text-gray-50'> Have an account?
                <Link to='/signup' className='text-red-600 hover:text-red-700 transition duration-150 ease-in-out ml-1'> Register</Link>
              </p>
              <p>
                <Link to='/forgot-password'
                 className='text-blue-600 hover:text-blue-700 transition duration-250 ease-in-out font-semibold'
                 > Forgot your password ?</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out mt-3 hover:shadow-lg active:bg-blue-800'>
              Sign UP
            </button>
            <div className='my-4 before:border-t after:border-t flex before:flex-1 after:flex-1  items-center before:border-gray-300 after:border-gray-300  '>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp
