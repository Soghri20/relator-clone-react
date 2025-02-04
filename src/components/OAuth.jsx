import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { supabase } from '../utils/supabase';


const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const onGoogleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Trigger Google login with a popup
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/profile", // Optional: You can specify a redirect URL here.
        },
      });

      if (error) {
        setError(error.message);
        setLoading();
        return;
      }

      console.log("Redirecting to Google login...");
      setLoading(user)

      // If you need to handle user session immediately, you can use the following
      // await handleRedirect();

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(()=>{
    handleRedirect()

  },[loading])

  // Function to handle the user after redirect (called after user is redirected back)
  const handleRedirect = async () => {
    try {
      // Get the authenticated user after redirect
      const { user, error } = await supabase.auth.getUser();

      if (error) {
        setError(error.message);
        return;
      }

      if (user) {
        console.log("User logged in:", user);
        await checkAndCreateUser(user);
      }

    } catch (error) {
      setError(error.message);
    }
  };

  // Check if the user exists and insert if they don't
  const checkAndCreateUser = async (user) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email); // Check if the user exists by email

    if (error) {
      setError(error.message);
      return;
    }

    if (data.length === 0) {
      // If the user doesn't exist, insert them into the 'users' table
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            email: user.email,
            name: user.user_metadata.full_name, // User's name
          },
        ]);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      console.log("User added to the users table!");
    } else {
      console.log("User already exists in the table.");
    }
  };
  return (
    <button onClick={onGoogleClick} type='button' className='w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-red-700 transition duration-200 ease-in-out mt-3 hover:shadow-lg active:bg-red-800 flex items-center justify-center'>
          Register with google
          <div className='ml-2 rounded-full  bg-white'>
            <FcGoogle />
          </div>
    </button>
  )
}

export default OAuth
