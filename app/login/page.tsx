'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {

  const router = useRouter ();
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });


    const onLogIn = async (e: React.FormEvent) => {
          e.preventDefault();      
    try {
      setLoading(true);
      console.log("Loading has been turned on"); 
      console.log("consle before the axios call");
      const response = await axios.post("/api/users/login",user);
      console.log("Response data : ",response);
      console.log("Login successfully",response.data);
      toast.success("Login successfully")
      router.push("/profile");

    } catch (error) {
      if (error instanceof Error) {
        console.log("Login failed", error.message);
        toast.error(error.message);
      } else {
        console.log("Login failed", error);
        toast.error("An unexpected error occurred.");
      }
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{

    if (user.email.length>0 && user.password.length>0) {
      setDisabledButton(false);
    }
    else{
      setDisabledButton(true);
    }
 
  },[user])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold neon-text">{loading ? "Processing....." : "Log-In" }</h1>
      <form
        onSubmit={onLogIn}
        className="flex flex-col gap-6 w-full max-w-sm p-6 rounded-2xl glassy-bg shadow-lg backdrop-blur-md border border-gray-700"
      >
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          className="input-glow"
        />

        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="input-glow"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300 "
        >
          {disabledButton ? 'All fields required' : 'Log-In'}
          </button>

        <Link
          href="/signup"
          className="text-sm font-medium text-blue-400 hover:text-blue-500 underline underline-offset-4 transition duration-200 text-center"
        >
          Don not have an account? Sign Up
        </Link>
      </form>
    </div>
  );
}
