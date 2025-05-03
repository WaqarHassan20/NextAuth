'use client';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Example sign-in logic
    if (!user.email || !user.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Simulate login success
    toast.success('Logged in successfully!');
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold neon-text">Login</h1>
      <form
        onSubmit={onSignIn}
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
          Sign In
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
