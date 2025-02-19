import React, { useState } from 'react'

const CreatingListing = () => {
    const [formData,setFormData]=useState({
        type :'rent',
        name : '',
        bedrooms:0,
        bathrooms:0,
        parking : false,
        furnished : false,
        address :'',
        description:'',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0

    })
    const {type,name,bedrooms,bathrooms,parking,furnished,address,offer,description,regularPrice,discountedPrice} = formData
    const onChange = ()=>{

    }
  return (
    <main className='max-w-md px-2 mx-auto'>
        <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
        <form>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent </p>
            <div className='flex'>
                <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${ type==='rent' ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='type' value='sale' onClick={onChange}>
                    sell
                </button>
                <button className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${ type==='sale' ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='type' value='sale' onClick={onChange}>
                    rent
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Name </p>
            <input placeholder='Name' type='text' id='name' onChange={onChange} maxLength='32' minLength='10' required 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition 
            duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6' />
            <div className='flex space-x-6 mb-6'>
                <div>
                    <p className='text-lg font-semibold'>beds</p>
                    <input type="number" 
                      id='bedrooms'
                      value={bedrooms}
                      onChange={onChange} min='0' max='50'
                      required
                      className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                </div>
                <div>
                    <p className='text-lg font-semibold'>beds</p>
                    <input type="number" 
                      id='bathrooms'
                      value={bathrooms}
                      onChange={onChange} min='0' max='50'
                      required
                      className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                </div>
            </div>
            <p className='text-lg mt-6 font-semibold'>Parking spot</p>
            <div className='flex'>
                <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${ parking ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='parking' value={true} onClick={onChange}>
                    Yes
                </button>
                <button className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${ !parking ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='parking' value={false} onClick={onChange}>
                    No
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished </p>
            <div className='flex'>
                <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${ furnished ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='furnished' value={true} onClick={onChange}>
                    Yes 
                </button>
                <button className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${!furnished ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='furnished' value={false} onClick={onChange}>
                    No
                </button>
            </div>
            <p className='text-lg mt-6 font-semibold'>Address</p>
            <textarea placeholder='Adress' type='text' id='address' onChange={onChange}  required 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition 
            duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-2' />

            <p className='text-lg mt-6 font-semibold'>Description</p>
            <textarea placeholder='Description' type='text' id='description' onChange={onChange}  required 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition 
            duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-2' />

            <p className='text-lg mt-6 font-semibold'>Offer</p>
             <div className='flex mb-3'>
               <button className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${ offer ? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='offer' value={true} onClick={onChange}>
                    Yes 
                </button>
                <button className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                     ${!offer? 'bg-white text-black':'bg-slate-500 text-white'}`} type='button' id='offer' value={false} onClick={onChange}>
                    No
                </button>
            </div> 
            <div className='flex items-center mb-6'>
                <div>
                <p className='text-lg font-semibold'>Regular price</p>
                    <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" 
                      id='regularPrice'
                      value={regularPrice}
                      onChange={onChange} min='0' max='400000'
                      required
                      className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded
                       transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                       {type ==='rent'&& (
                        <p className=''>
                            <p className='text-md w-full whitespace-nowrap'> $ / Month</p>
                        </p>
                        
                    )}
                    </div>
                    
                </div>
            </div>
            {offer && (
                <div className='flex items-center mb-6'>
                <div>
                <p className='text-lg font-semibold'>Discounted Price</p>
                    <div className='flex w-full justify-center items-center space-x-6'>
                    <input type="number" 
                      id='discountedPrice'
                      value={discountedPrice}
                      onChange={onChange} min='0' max='400000'
                      required={offer}
                      className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded
                       transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'/>
                       {type ==='rent'&& (
                        <p className=''>
                            <p className='text-md w-full whitespace-nowrap'> $ / Month</p>
                        </p>
                        
                    )}
                    </div>
                    
                </div>
            </div>
            )}
            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-gray-600'>the first image will be the cover (max 6)</p>
                <input type="file" id ='images' onChange={onChange} accept='.jpg,.png,.jpeg'
                multiple
                required
                className='w-full px-3 py-1.5  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-500'/>
            </div>
            <button type="submit" className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercaserounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out'>Created Listing</button>
        </form>

    </main>
  )
}

export default CreatingListing
