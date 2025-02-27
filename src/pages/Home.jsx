import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { supabase } from '../utils/supabase'
import { Link } from 'react-router'
import Listing from './Listing'
import ListingItem from '../components/ListingItem'

const Home = () => {
  const [offering,setOffering]=useState([])
  useEffect(()=>{
    async function fetching (){
      try{
        const {data,error}=await supabase.from('listings').select('*')
        .eq('offer',true).order('created_at', { ascending: false }).limit(4)
        if(error) throw error
        if(data) {
          console.log(data)
          setOffering(data)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetching()
  },[])
  const [rent,setRent]=useState([])
  useEffect(()=>{
    async function fetching (){
      try{
        const {data,error}=await supabase.from('listings').select('*')
        .eq('type','rent').order('created_at', { ascending: false }).limit(4)
        if(error) throw error
        if(data) {
          console.log(data)
          setRent(data)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetching()
  },[])
  const [sales,setSales]=useState([])
  useEffect(()=>{
    async function fetching (){
      try{
        const {data,error}=await supabase.from('listings').select('*')
        .eq('type','sale').order('created_at', { ascending: false }).limit(4)
        if(error) throw error
        if(data) {
          console.log(data)
          setSales(data)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetching()
  },[])
 
  return (
    <div>
      <Slider />
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {offering && offering.length > 0 && (
          <div className='m-2 mb-6' >
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offers</h2>
            <Link to='/offers'>
               <p className='pt-3 ml-8 text-sm text-blue-600 hover:text-blue-700 transition duration-150'>Show more offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offering.map((listing)=>{
               return  <ListingItem key={listing.id} listing={listing} />
              })}
            </ul>
          </div>
        )}
         {rent && rent.length > 0 && (
          <div className='m-2 mb-6' >
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for rent</h2>
            <Link to='/category/rent'>
               <p className='pt-3 ml-8 text-sm text-blue-600 hover:text-blue-700 transition duration-150'>Show more places for rent</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {rent.map((listing)=>{
               return  <ListingItem key={listing.id} listing={listing} />
              })}
            </ul>
          </div>
        )}
        {sales && sales.length > 0 && (
          <div className='m-2 mb-6' >
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Places for sales</h2>
            <Link to='/category/sale'>
               <p className='pt-3 ml-8 text-sm text-blue-600 hover:text-blue-700 transition duration-150'>Show more places for sals</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {sales.map((listing)=>{
               return  <ListingItem key={listing.id} listing={listing} />
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
