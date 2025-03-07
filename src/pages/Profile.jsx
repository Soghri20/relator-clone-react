import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../utils/supabase';
import { toast } from 'react-toastify';
import useAuthStatus from '../hooks/useAuthStatus';
import { FcHome } from "react-icons/fc";
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';


function Profile() {
  const [isCompleted, setIsCompleted] = useState(true);
  const [loader,setLoader]=useState(false)
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings,setListings]=useState([])
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });

  const { usering, loading } = useAuthStatus();
  const { fullName, email } = formData;
  const navigate = useNavigate();

  // Log out function
  const onLogout = async () => {
    let { error } = await supabase.auth.signOut();
    navigate('/');
  };

  // Handle form field changes
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Handle profile update
  const onSubmit = async () => {
    if (!fullName || !email) {
      toast.error('Please fill in both fields');
      return;
    }
    
    try {
      // Check if the user exists in the database
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single(); // Use `.single()` to fetch only one record

      if (error) {
        console.error('Error fetching user:', error.message);
        toast.error('Error fetching user data');
        return;
      }

      if (data) {
        // If user exists, update the full name
        const { data:updatedUser,error: updateError } = await supabase
          .from('users')
          .update({ fullName : fullName}) // Update the full name
          .eq('email', email);

        if (updateError) {
          console.error('Error updating user:', updateError.message);
          toast.error('Could not update the profile');
        } else {
          toast.success('Profile updated successfully!');
          console.log(updatedUser)
          // setFormData({
          //   fullName:updatedUser[0]?.fullName,
          //   email:updatedUser[0]?.email
          // })
        }
      } else {
        toast.error('User not found');
      }
    } catch (error) {
      toast.error('Something went wrong while updating the profile');
      console.error(error.message);
    }
  };

  // Fetch user data and check if user exists or not
  useEffect(() => {
    if (!loading) {
     
      const fetchUser = async () => {
        setLoader(true)
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', usering.email);

        if (users.length > 0) {
          console.log('User already exists', users[0]?.fullName);
         

        } else {
          // Create the user in the 'users' table if it doesn't exist
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              email: usering?.email,
              fullName: usering?.identities[0]?.identity_data?.full_name,
              user_id: usering?.id,
            }]);

          if (insertError) {
            console.error('Error creating user:', insertError.message);
          } else {
            console.log('User added to the users table!');
          }
        }
        setFormData({
          fullName:users[0]?.fullName,
          email:users[0]?.email
        })
       fetchUserListing()
       setLoader(false)
       
      };

      fetchUser();
      console.log(loader)
    }
  }, [usering, loading]);
 
   
   const fetchUserListing = async ()=>{

    try{
      console.log('here',usering.id)
      let { data, error } = await supabase.from('listings').select('*').eq('user_id',usering?.id);
      if(error) throw error

      setListings(data)
      

    }catch(error){
      console.log(error)
    } 
  }
  async function onDelete(listingId) {
    if(window.confirm('are you sure you want to delete?')){
      const { error } = await supabase.from('listings').delete()
       .eq('id', listingId)
       if(!error){
        toast.success('the list has been deleted successfully')
        console.log(listings)
        const newListing =  listings.filter(listing =>listing?.id !== listingId)
        setListings(newListing)
       }
    }

  }
  function onEdit (lisitingID) {
    navigate(`/edit-listing/${lisitingID}`)

  }
  if (loading && loader) return <Spinner />;

  return (
    <>
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          <input
            type="text"
            id="fullName"
            value={fullName}
            disabled={!changeDetail}
            onChange={onChange}
            className="w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />
          <input
            type="email"
            id="email"
            value={email}
            disabled={!changeDetail}
            onChange={onChange}
            className="w-full px-4 py-2 text-xl mb-6 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p className="flex items-center mb-6">
              Do you want to change your name? 
              <span
                onClick={() => {
                  if (changeDetail) onSubmit(); // Only submit if editing
                  setChangeDetail(!changeDetail); // Toggle edit mode
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? 'Apply changes' : 'Edit'}
              </span>
            </p>
            <p
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer font-semibold"
              onClick={onLogout}
            >
              Sign out
            </p>
          </div>
        </form>
        <button type='submit' className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'>
          <Link to='/create-listing' className='flex justify-center items-center'>
             <FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2'/>
             Sell or Rent your home 
          </Link>
        </button>
      </div>
    </section>
    <div className='max-w-6xl px-3 mt-6 mx-auto'>
      {!loading && listings.length >0 &&(
        <>
         <h2 className='text-2xl text-center font-semibold'>My listings</h2>
         <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6' >
          {listings.map((listing)=>{
           return  <ListingItem   key={listing.id} listing={listing}
           onDelete={()=>onDelete(listing.id)}
           onEdit={()=>onEdit(listing.id)}/>
          })}
         </ul>
        </>
      )}
    </div>
    </>
  );
}

export default Profile;
