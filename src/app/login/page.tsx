"use client";
import Link from 'next/link';
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {toast} from "react-hot-toast"
import axios from "axios";
export default function LoginPage() {
  const router=useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);


  const [user,setUser]=useState({
    email:"",
    password:"",
  })
  const onLogin=async()=>{
    try {
      setLoading(true)
      const response=await axios.post("api/users/login",user)
      console.log("login success",response)
      toast.success("login success")
      router.push("/profile")
    } catch (error:any) {
      console.log("login Failed",error.message)
      toast.error(error.messsage)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length>0&& user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className='flex flex-col justify-center min-h-screen items-center py-2 bg-black'>
      <h1 className='text-white'>{loading?"processing":"Login"}</h1>
      <hr />
      <label htmlFor="email" className='text-white m-2'>email</label>
      <input className='rounded-md p-2'
      id='email'
      type='text'
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder='email'
      />
      <label htmlFor="password" className='text-white m-2
      '>password</label>
      <input className='rounded-md p-2'
      id='password'
      type='password'
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder='password'
      />
      <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-white'>Submit
      </button>
      <Link href="/signup" className='text-white'>visit signup page</Link>
    </div>
  )
}
