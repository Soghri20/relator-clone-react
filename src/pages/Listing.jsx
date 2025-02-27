import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { supabase } from '../utils/supabase'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaBath, FaBed, FaChair, FaParking, FaRegShareSquare } from "react-icons/fa";
import { FaMapMarked, Fabed } from "react-icons/fa";


import '../../src/index.css'
import 'swiper/css'; // Basic styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import useAuthStatus from '../hooks/useAuthStatus'
import Contact from '../components/Contact'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const Listing = () => {
    const params = useParams()
    const {usering} = useAuthStatus()
    const [listing,setListing]=useState(null)
    const [testing,setTesting]=useState([])
    const [loading,setLoading]=useState(false)
    const [contactLandlord,setContactLandlord]=useState(false)
    const [shareLinkCopied,setShareLinkCopied]=useState(false)
    const listingId = params.listingId
    useEffect(() => {
        async function fetchListing() {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('listings')
                    .select('*')
                    .eq('id', listingId)
                    .single();
    
                if (error) return console.error(error);
                if (data) {
                    console.log('Fetched Data:', data); // Check if data is correct
                    setListing(data);
                    setTesting(data);
                }
            } catch (err) {
                console.error('Error fetching listing =>', err);
            } finally {
                setLoading(false);
            }
        }
        fetchListing();
    }, [listingId]);
  

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
        <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-gray-400 rounded-full w-12 h-12
        flex justify-center items-center' onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(()=>{
                setShareLinkCopied(false)
            },2000)
        }}>
            
         <FaRegShareSquare className='text-lg text-slate-500' />
         {shareLinkCopied && <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 '>Link Copied !</p> }
        </div>
        <div className='flex flex-col md:flex-row max-w-6xl lg:mx-auto p-5 rounded-lg mt-3  shadow-lg bg-white lg:space-x-6 '>
            <div className='w-full  '>
                <p className='text-2xl mb-3 text-blue-900 font-bold capitalize'>
                    {listing?.name} - $ {listing?.offer ? listing?.discountedPrice : listing?.regularPrice  }
                    {listing?.type === 'rent' ? '/ Month' : ''}
                    
                </p>
               <p className='flex items-center mt-3 mb-3 font-semibold'>
                <FaMapMarked className='text-green-700 mr-1' /> 
                 {listing?.address}
                </p>
                <div className='flex justify-start items-center space-x-4w-[75%]'>
                    <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing?.type === 'rent' ? 'Rent' : 'Sale'}</p>
                    {listing?.offer &&(
                        <p className='w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md ml-2'> ${ listing.regularPrice - listing.discountedPrice} Discount</p>
                    )}
                </div>
                <p className='mt-3 mb-3 font-semibold'>Description - <span className='font-normal'>{listing?.description}</span></p>
                <ul className='flex items-center space-x-2 lg:space-x-8 text-sm font-semibold'>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaBed className='text-lg mr-1' />
                        {listing?.bedrooms > 1 ? `${listing?.bedrooms} Beds` : '1 Bed'}
                    </li>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaBath className='text-lg mr-1' />
                        {listing?.bathrooms > 1 ? `${listing?.bathrooms} Beds` : '1 Bed'}
                    </li>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaParking className='text-lg mr-1' />
                        {listing?.parking  ? `Parking Spot` : 'No Parking'}
                    </li>
                    <li className='flex items-center whitespace-nowrap'>
                        <FaChair className='text-lg mr-1' />
                        {listing?.furnished  ? `Furnished` : 'No Furnished'}
                    </li>

                    
                </ul>
                {listing?.user_id !== usering?.id  && !contactLandlord && 
                <div className='mt-6'>
                   <button onClick={()=>setContactLandlord(true)} className='text-white w-full bg-blue-600 px-7 py-3 font-medium text-sm uppercase text-center transition duration-150 ease-in-out rounded shadow-md hover:bg-blue-700 hover:shadow-lg'>
                      Contact Landlord
                   </button>
                </div>
                 }
                 {contactLandlord && (
                    <Contact listing={listing} userId={listing?.user_id}/>
                 )}
                
            </div>
            <div className=' w-full h-[200px] md:h-[600px] mt-6 md:ml-2 md:mt-0 z-10 overflow-x-hidden'>
            {listing?.lattitude && listing?.longtittude ? (
    <MapContainer
      center={[listing?.lattitude,listing?.longtittude ]}
      zoom={13}
      scrollWheelZoom={false}
      style={{height:'100%',width:'100%'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[listing?.lattitude,listing?.longtittude ]}>
        <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p className="text-center text-red-500">Location not available</p>
  )}
            </div>
        </div>
    </main>
  )
}

export default Listing
