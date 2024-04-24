"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import {toast} from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup failed", response.data);
      router.push("/login"); // corrected usage
    } catch (error:any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col justify-center min-h-screen items-center py-2 bg-black'>
      <h1 className='text-white'>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username" className='text-white m-2'>username</label>
      <input
        className='rounded-md p-2'
        id='username'
        type='text'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
      />
      <label htmlFor="email" className='text-white m-2'>email</label>
      <input
        className='rounded-md p-2'
        id='email'
        type='text'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor="password" className='text-white m-2'>password</label>
      <input
        className='rounded-md p-2'
        id='password'
        type='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className='p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-white'>
        {loading ? "Processing" : "Signup"}
        </button>
      <Link href="/login" className='text-white'>visit login page</Link>
    </div>
    
  );
}
