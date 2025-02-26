import React, { useEffect, useState } from 'react'
import useAuthStatus from '../hooks/useAuthStatus'
import { toast } from 'react-toastify'
import { supabase } from '../utils/supabase'
import Spinner from './Spinner'
import { Link } from 'react-router'

const Contact = ({listing,userId}) => {
    const [message,setMessage] = useState('')
    const {usering} = useAuthStatus()
    const [landlord,setLandlord]=useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        console.log(userId)
        async function getLandlord(){
            setLoading(true)
            try{
                const {data,error}=await supabase.from('users').select('*').eq('user_id',userId)
                if(error) return toast.error('could not fetch the user')
                console.log(data)
                setLandlord(data[0])
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        
        }
        getLandlord()
    },[userId])
    const onSubmit= ()=>{
        if(!usering){
            toast.error("please sign in first !!")
            return 
        }
    }
    if(loading) return <p>Loading ...</p>
  return (
    <div>
        <p className='mt-3 font-semibold '>Contact the {landlord?.fullName} for getting what you like  </p>
      {usering &&<textarea
         placeholder='Type a message' type='text' id='message' onChange={(e)=>setMessage(e.target.value)} required value={message}
         className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mt-3'
         />}
         {usering ? <a href={`maito:${landlord?.email}?Subject=${listing.name}&body=${message}`}>
         <button className='text-white w-full bg-blue-600 px-7 py-3 font-medium text-sm uppercase text-center transition duration-150 ease-in-out rounded shadow-md hover:bg-blue-700 hover:shadow-lg'>
                Send Message
         </button>
         </a> :<Link to='/signin'><button className='text-white w-full bg-red-600 px-7 py-3 mt-5 font-medium text-sm uppercase text-center transition duration-150 ease-in-out rounded shadow-md hover:bg-red-700 hover:shadow-lg'>
                Log in
         </button> </Link> }
    </div>
  )
}

export default Contact
