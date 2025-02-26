import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../utils/supabase'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../src/index.css'
import 'swiper/css'; // Basic styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

const Listing = () => {
    const params = useParams()
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(false)
    const listingId = params.listingId
    useEffect(()=>{
        console.log(params)
        async function fetchListing(){
            try{
                setLoading(true)
                const {data,error} =await supabase.from('listings')
                .select('*').eq('id',listingId).single()
                if(error) throw error
                setListing(data)
                console.log('here',data.uploadedImageUrls)
            }catch(err){
                console.err('error fetching listing =>',err)
            }finally{
                setLoading(false)
            }
        }
       if(listingId) fetchListing()
    },[listingId])

  if(loading) return <Spinner />

  return (
    <main>
         <Swiper
                 modules={[Navigation, Pagination, Autoplay,EffectFade]} // Add desired features
                 spaceBetween={10} // Space between slides
                 slidesPerView={1} // How many slides to show
                 navigation // Enable navigation arrows
                 pagination={{ type: 'progressbar' }} // Enable pagination dots
                 autoplay={{ delay: 3000 }} // Auto-slide every 3s
           >
            {listing?.uploadedImageUrls.map((url,index)=>{
                return <SwiperSlide key={index}>
                              <div  style=
                              {{
                                background:`url(${listing?.uploadedImageUrls[index]}) center no-repeat`,
                                backgroundSize:'cover'
                            }}
                               className=" relative w-full h-[300px] overflow-hidden" />
                       </SwiperSlide>
            })}
        </Swiper>
    </main>
  )
}

export default Listing
