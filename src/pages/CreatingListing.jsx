import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import useAuthStatus from '../hooks/useAuthStatus';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router';

const CreatingListing = () => {
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        type: 'rent',
        name: 'othmane soghri',
        bedrooms: 10,
        bathrooms: 10,
        parking: false,
        furnished: false,
        address: 'CASABLANCA',
        description: 'TKHRBIQ ',
        offer: true,  
        regularPrice: 10,
        discountedPrice: 10,
        images: [],
    });
    const [loading, setLoading] = useState(false);
    const { usering } = useAuthStatus();
    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, description, regularPrice, discountedPrice, images } = formData;
    console.log(usering)
    // Handle form input changes
    const onChange = (e) => {
        let boolean = null;
        if (e.target.value === 'true') {
            boolean = true;
        }
        if (e.target.value === 'false') {
            boolean = false;
        }

        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                images: e.target.files,  // store selected files
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };

   // Helper function to upload a single image
    const uploadImage = async (image) => {
        const fileExtension = image.name.split('.').pop();  // Extract file extension
        const fileName = uuidv4() + '.' + fileExtension;  // Create unique filename
        const filePath = `listings/${fileName}`;
        
        const { data, error } = await supabase.storage
            .from('testing')
            .upload(filePath, image);

        if (error) throw error;

        const { data: publicURLData,urlError } = supabase.storage
        .from('testing')
        .getPublicUrl(filePath);
        const publicUrl = publicURLData.publicUrl;

        if (urlError) throw urlError;
      

         return publicUrl;
    };
    // 
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate prices
        if (discountedPrice >= regularPrice) {
            setLoading(false);
            toast.error('Discounted price needs to be less than regular price');
            return;
        }

        // Validate image count
        if (images.length > 6) {
            setLoading(false);
            toast.error('Maximum of 6 images allowed');
            return;
        }

        try {
            // Create a list to store the image URLs
            const uploadedImageUrls = [];
            
            // Upload images concurrently using Promise.all
            const imagePromises = Array.from(images).map((image) => uploadImage(image));
            const imageResults = await Promise.all(imagePromises);

            // Store the uploaded URLs
            uploadedImageUrls.push(...imageResults);
            console.log(uploadedImageUrls)

           // If everything is successful, update the formData state with the image URLs
            const formDataCopy = {
                ...formData,
                uploadedImageUrls,
                user_id :usering?.id
            }
            delete formDataCopy.images
            !formData.offer && delete formDataCopy.discountedPrice
            const {data ,error} =await supabase.from('listings')
            .insert([formDataCopy], { returning: "representation" }).select()
            if (error) throw error
           // Perform the logic to save the listing (store the rest of the form data as needed)

            toast.success('Listing created successfully!');
            console.log(data)
            navigate(`/category/${formDataCopy.type}/${data?.[0]?.id}`)

        } catch (error) {
            toast.error('Error uploading images: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <main className='max-w-md px-2 mx-auto'>
            <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
            <form onSubmit={onSubmit}>
                <p className='text-lg mt-6 font-semibold'>Sell / Rent </p>
                <div className='flex'>
                    <button
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${type !== 'rent' ? 'bg-white text-black' : 'bg-slate-500 text-white'}`}
                        type='button' id='type' value='rent' onClick={onChange}>
                        Rent
                    </button>
                    <button
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${type !== 'sale' ? 'bg-white text-black' : 'bg-slate-500 text-white'}`}
                        type='button' id='type' value='sale' onClick={onChange}>
                        Sale
                    </button>
                </div>

                <p className='text-lg mt-6 font-semibold'>Name</p>
                <input
                    placeholder='Name' type='text' id='name' onChange={onChange} maxLength='32' minLength='10' required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />

                <div className='flex space-x-6 mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Beds</p>
                        <input
                            type="number"
                            id='bedrooms'
                            value={bedrooms}
                            onChange={onChange} min='0' max='50'
                            required
                            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                    </div>

                    <div>
                        <p className='text-lg font-semibold'>Bathrooms</p>
                        <input
                            type="number"
                            id='bathrooms'
                            value={bathrooms}
                            onChange={onChange} min='0' max='50'
                            required
                            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                    </div>
                </div>

                <p className='text-lg mt-6 font-semibold'>Parking Spot</p>
                <div className='flex'>
                    <button
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${parking ? 'bg-white text-black' : 'bg-slate-500 text-white'}`}
                        type='button' id='parking' value={true} onClick={onChange}>
                        Yes
                    </button>
                    <button
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${!parking ? 'bg-white text-black' : 'bg-slate-500 text-white'}`}
                        type='button' id='parking' value={false} onClick={onChange}>
                        No
                    </button>
                </div>

                <p className='text-lg mt-6 font-semibold'>Furnished</p>
                <div className='flex'>
                    <button
                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${furnished ? 'bg-white text-black' : 'bg-slate-500 text-white'}`}
                        type='button' id='furnished' value={true} onClick={onChange}>
                        Yes
                    </button>
                    <button
                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full
                            ${!furnished ? 'bg-white text-black' : 'bg-slate-500 text-white'}`}
                        type='button' id='furnished' value={false} onClick={onChange}>
                        No
                    </button>
                </div>

                <p className='text-lg mt-6 font-semibold'>Address</p>
                <textarea
                    placeholder='Address' type='text' id='address' onChange={onChange} required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />

                <p className='text-lg mt-6 font-semibold'>Description</p>
                <textarea
                    placeholder='Description' type='text' id='description' onChange={onChange} required
                    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
                />
                <p className="text-lg font-semibold">Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            no
          </button>
        </div>

                <div className='flex space-x-6 mb-6'>
                    <div>
                        <p className='text-lg font-semibold'>Regular Price</p>
                        <input
                            type="number"
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onChange}
                            min='0'
                            required
                            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                        />
                    </div>

                    {offer && (
                        <div>
                            <p className='text-lg font-semibold'>Discounted Price</p>
                            <input
                                type="number"
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onChange}
                                min='0'
                                required
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
                            />
                        </div>
                    )}
                </div>

                <div className='mb-6'>
                    <p className='text-lg font-semibold'>Images</p>
                    <p className='text-gray-600'>The first image will be the cover (max 6)</p>
                    <input
                        type="file"
                        id="images"
                        onChange={onChange}
                        accept=".jpg,.png,.jpeg"
                        multiple
                        required
                        className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-500"
                    />
                </div>

                <button
                    type="submit"
                    className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out"
                >
                    Create Listing
                </button>
            </form>
        </main>
    );
};

export default CreatingListing;
