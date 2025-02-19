import React, { useState } from 'react'

const CompleteProfile = () => {
    const [fullName,setFullName]=useState('')
  return (
    <div>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col' >
       <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
       <div className='w-full md:w-[50%] mt-6 px-3'>
       <form>
         <input type='text' id='fullName' value={fullName} disabled className='w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' /> 
         <button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">Proceed</button>
       </form>
       </div>
       
     </section> 
    </div>
  )
}

export default CompleteProfile
