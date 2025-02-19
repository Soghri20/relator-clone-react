import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../utils/supabase';
import { toast } from 'react-toastify';
import useAuthStatus from '../hooks/useAuthStatus';
import { FcHome } from "react-icons/fc";


function Profile() {
  const [isCompleted, setIsCompleted] = useState(true);
  const [loader,setLoader]=useState(false)
  const [changeDetail, setChangeDetail] = useState(false);
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
    const fullNameCopy='zakaria'
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
       setLoader(false)
       
      };

      fetchUser();
      console.log(loader)
    }
  }, [usering, loading]);
 
  

  if (loading && loader) return 'loading...';

  return (
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
  );
}

export default Profile;
