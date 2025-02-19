import React, { useState } from 'react';
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, fullName } = formData;

  function onChange(e) {
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  }

  // Check if the email exists
  const checkTheUser = async (email) => {
    try {
      const { data, error } = await supabase.rpc('check_email_exists', { input_email: email });
      if (error) {
        console.error("Error checking email:", error);
        toast.error("There was an error checking the email. Please try again.");
        return false; // Early exit if there's an error
      }
      return !data; // Return true if email doesn't exist
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again later.");
      return false; // Return false if any unexpected error occurs
    }
  };

  // Simple email regex to check for valid email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;"'<>,.?/~\\|-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (email === '' || password === '' || !isValidEmail(email)) {
      toast.error('Please enter a valid email and password');
      setLoading(false);
      return;
    } else if (!isValidPassword(password)) {
      toast.error('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
      setLoading(false);
      return;
    }

    const isEmailAvailable = await checkTheUser(email);
    if (!isEmailAvailable) {
      setLoading(false);
      return; // Exit if the email is already registered
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        handleError(error);
        setLoading(false);
        return;
      } else if (data) {
        const person = data?.user;
        const copyFormData = { ...formData, user_id: person?.id };
        delete copyFormData.password;
        try {
          const { data, error } = await supabase.from("users").insert(copyFormData);

          if (error) {
            toast.error(error.message);
            throw new Error(error.message);
          }

          navigate("/");
          toast.success("You're logged in!");
          setLoading(false);
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      }

    } catch (error) {
      setError({
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
      setLoading(false);
    }
  };

  const handleError = (error) => {
    let errorMessage = "";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "The email address is not valid. Please enter a valid email.";
        break;
      case "auth/email-already-exists":
        errorMessage = "The email address is already registered. Please log in or use a different email.";
        break;
      case "auth/weak-password":
        errorMessage = "Your password is too weak. Please choose a stronger password.";
        break;
      default:
        errorMessage = "An unexpected error occurred. Please try again.";
        break;
    }

    setError({
      message: errorMessage,
      code: error.code,
    });

    toast.error(errorMessage);
  };

  return (
    <section>
      <h1 className="text-center text-3xl font-bold mt-6">Sign Up</h1>
      <div className="mx-auto flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl">
        <div className="w-full md:w-[67%] lg:w-[50%]">
          <img
            className="rounded-lg w-full"
            src="https://plus.unsplash.com/premium_photo-1693842703126-6337dd42bf32?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSignUp}>
            <input
              className="w-full mt-4 md:mt-6 lg:mt-0 form-input rounded text-xl bg-white text-gray-700 px-4 py-3 transition ease-in-out border-gray-300"
              type="text"
              id="fullName"
              value={fullName}
              onChange={onChange}
              placeholder="Full Name"
            />
            <input
              className="w-full mt-3 form-input rounded text-xl bg-white text-gray-700 px-4 py-3 transition ease-in-out border-gray-300"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
            />
            <div className="relative mt-3">
              <input
                className="w-full form-input rounded text-xl bg-white text-gray-700 px-4 py-3 transition ease-in-out border-gray-300"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <FaRegEye className="cursor-pointer absolute right-3 top-4 text-xl" onClick={() => { setShowPassword(!showPassword); }} />
              ) : (
                <FaEyeSlash className="cursor-pointer absolute right-3 top-4 text-xl" onClick={() => { setShowPassword(!showPassword); }} />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out mt-3 hover:shadow-lg active:bg-blue-800"
              disabled={loading}
            >
              Sign Up
            </button>
            <div className="my-4 before:border-t after:border-t flex before:flex-1 after:flex-1 items-center before:border-gray-300 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
