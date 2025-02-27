import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import { supabase } from '../utils/supabase'
import { useParams } from 'react-router'

const Category = () => {
  const [listings,setListings]=useState(null)
  const [loading,setLoading]=useState(true)
  const [lastFetched,setLastFetched]=useState(null)
  const params = useParams()
  useEffect(()=>{
    async function fetching (){
          try{
            const {data,error}=await supabase.from('listings').select('*')
            .eq('type',params.categoryName).limit(2)
            if(error) throw error
            if(data) {
              
              setListings(data)
              const lastOne= data.length-1
              setLastFetched(lastOne)
            }

          }catch(error){
            console.log(error)
          }finally{
            setLoading(false)
          }
        }
        fetching()
    
  },[params.categoryName])
  const fetchingMore = async () =>{
    if (loading) return; // Prevent multiple requests
  
  try {
    const start = lastFetched + 1;
    const end = start + 2; // Fetch 3 more listings
    
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('type', params.categoryName)
      .order('created_at', { ascending: false }) // Keep newest first
      .range(start, end); // Fetch next set of listings

    if (error) throw error;

    if (data && data.length > 0) {
      setListings((prevListings) => [...prevListings, ...data]); // Append new data
      setLastFetched(end); // Update last fetched index
    }

  } catch (error) {
    console.error("Error fetching more listings:", error);
  } finally {
    setLoading(false);
  }


  }
  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Places for{params.categoryName ==='rent' ? ' Rent' :' Sales'}</h1>
      {loading ? (
        <Spinner /> 
      ) : listings && listings.length > 0 ? (
        <>
         <main>
          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
            {listings.map((listing)=>(
              <ListingItem listing={listing}/>
            ))}
          </ul>
         </main>
         {lastFetched && (
          <div className='flex justify-center items-center'>
            <button onClick={fetchingMore} className='bg-white px-3 rounded-lg py-1.5 shadow-lg text-black'>Load More</button>
          </div>
         )}
        </>
      ): <p>There are no current {params.categoryName ==='rent' ? ' Rent' :' Sales'} </p> }
    </div>
  )
}

export default Category
