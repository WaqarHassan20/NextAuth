'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Signup() {
  
    const router = useRouter();

    const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [disabledButton,setDisabledButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length>0 && user.username.length>0 && user.password.length>0 ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  },[user])

    // Sign Up Function
    const onSignUp = async (e: React.FormEvent) => {
        e.preventDefault();      
    try {
        setLoading(true);
        const res = await axios.post("/api/users/signup",user)
        console.log("Sign Up successfully",res.data);
        router.push("/login");
        toast.success("Sign Up successfully")

    } catch (error: unknown) {

        if (error instanceof Error) {
            console.log("SignUp failed", error.message);
            toast.error(error.message);
        } else {
            console.log("SignUp failed", "An unknown error occurred");
            toast.error("An unknown error occurred");
        }

    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold neon-text">{loading ? "Processing" : "Sign-up" }</h1>
      <form
        onSubmit={onSignUp}
        className="flex flex-col gap-6 w-full max-w-sm p-6 rounded-2xl glassy-bg shadow-lg backdrop-blur-md border border-gray-700"
      >
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          placeholder="Enter your email"
          className="input-glow"
        />

        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          placeholder="Enter your username"
          className="input-glow"
        />

        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Enter your password"
          className="input-glow"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
        >
          {disabledButton ? 'Please fill all fields' : 'Sign Up'}
        </button>
        <Link
          href="/login"
          className="text-sm font-medium text-blue-400 hover:text-blue-500 underline underline-offset-4 transition duration-200 text-center"
        >Already have an account? Log-In</Link>
      </form>
    </div>
  );
}
