import React from 'react'
import { FcGoogle } from "react-icons/fc";


const OAuth = () => {
  return (
    <button type='submit' className='w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out mt-3 hover:shadow-lg active:bg-red-800 flex items-center justify-center'>
          Register with google
          <div className='ml-2 rounded-full  bg-white'>
            <FcGoogle />
          </div>
    </button>
  )
}

export default OAuth
