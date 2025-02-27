import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'



import '../../src/index.css'
import 'swiper/css'; // Basic styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';



const List = ({listing}) => {
  return (
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
  )
}

export default List
