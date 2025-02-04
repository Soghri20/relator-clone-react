import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { supabase } from '../utils/supabase'

function Profile() {
  const [formData,setFormData]=useState({
    fullName :'othmane soghri',
    email :'osoghri0@gmail.com' 
  })
  const {fullName,email}=formData
  const navigate=useNavigate()

  const onLogout=async()=>{
    let { error } = await supabase.auth.signOut()
    navigate('/')


  }

  return (
    <>
     <section className='max-w-6xl mx-auto flex justify-center items-center flex-col' >
       <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
       <div className='w-full md:w-[50%] mt-6 px-3'>
       <form>
         <input type='text' id='fullName' value={fullName} disabled className='w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' /> 
         <input type='email' id='email' value={email} disabled className='w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' /> 

         <div className='flex  justify-between whitespace-nowrap text-sm sm:text-lg'>
           <p className='flex items-center mb-6 '>do you want to change your name? <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>Edit</span></p>
           <p className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer font-semibold' onClick={onLogout}>Sign out</p>
         </div>
       </form>
       </div>
       
     </section> 
    </>
  )
}

export default Profile
