import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import Spinner from './Spinner'
import 'swiper/css'; // Basic styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles

import { useNavigate } from 'react-router';
import '../../src/index.css'
import 'swiper/css'; // Basic styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'





const Slider = () => {
    const [listings,setListings]=useState([])
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
      async function fetchListings(){
        setLoading(true)
        try{
          const { data, error } = await supabase
                  .rpc('random_listings') // Assuming 'random_listings' is a custom SQL function in your Supabase DB
                  .limit(5);
          if(error) throw error
          if(data) {
            setListings(data)
          
          } 
        }catch(error){
         console.log(error)
      }finally{
        setLoading(false)
      }
  
      }
      fetchListings()
  
    },[])
    if(loading) return <Spinner />
    // importent 
    if(listings.length === 0){
      return <></>
    }
    return listings && <>
    <Swiper
       modules={[Navigation, Pagination, Autoplay,EffectFade]} // Add desired features
                      spaceBetween={10} // Space between slides
                      slidesPerView={1} // How many slides to show
                      navigation // Enable navigation arrows
                      pagination={{ type: 'progressbar' }} // Enable pagination dots
                      autoplay={{ delay: 3000 }}
     >
    {listings?.map((listing)=>{
        return (
            <SwiperSlide key={listing.id} onClick={()=>navigate(`/category/${listing.type}/${listing.id}`)}>
                <div className='relative w-full h-[300px] overflow-hidden' style={{background:`url(${listing?.uploadedImageUrls[0]}) center , no-repeat`, backgroundSize :'cover'}}>

                </div>
                <p className='text-[white] absolute left-1 top-3 font-medium max-w-[90%] bg-blue-950  rounded-lg shadow-xl p-2 '>{listing.name}</p>
                <p className='text-[white] absolute right-3 bottom-3 font-medium max-w-[100%] bg-violet-900  rounded-lg shadow-xl px-6 py-2 '>
                    ${listing.discountedPrice ?? listing.regularPrice}
                    {listing.type === 'rent' && '/ Month'}
                </p>

            </SwiperSlide>
           
        )
     })}
    </Swiper>
     
    
    </>
}

export default Slider
