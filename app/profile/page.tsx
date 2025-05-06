"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserProfile() {

  const router = useRouter();
  const [user,setUser] = useState("nothing")

  const logout = async () => {
    try {

      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
      
    } catch (error) {
      if (error instanceof Error) {
        console.log("Logout error:", error.message);
        toast.error(error.message);
      } else {
        console.log("An unknown error occurred during logout.");
      }
    }
  };

  const getUser = async () => {
    const res= await axios.get("/api/users/me")
    console.log(res.data)
    setUser(res.data.data._id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
    <h1 className="text-5xl my-12 font-extrabold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-700 bg-clip-text text-center">
       User Profile Dashboard
    </h1>
    
    <h1 className="text-2xl my-12 font-extrabold text-white bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-700 bg-clip-text text-center">
        {user=="nothing" ? "Nothing" : <Link href={`/profile/${user}`}>MongoDB UserId : <span className="bg-orange-700 rounded-md p-2">{user}</span></Link>}
    </h1>



      <div className="flex flex-col gap-12 w-full max-w-6xl p-8 rounded-2xl bg-opacity-80 backdrop-blur-2xl bg-black mx-auto shadow-2xl border-2 border-gray-700">
    
        {/* Profile Information Section */}
      
        <div className="flex gap-6 mb-6 justify-between">
      
      <div className="flex flex-row gap-6">

          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg flex items-center justify-center">
            <span className="text-3xl font-bold">A</span>
          </div>
          
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-semibold">JOHN DOE</p>
            <p className="text-lg text-gray-300">Web Developer</p>
            <p className="text-md text-gray-400 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros vitae erat hendrerit egestas.
            </p>
          </div>
      
      </div>

      <div className="flex flex-col items-center gap-5">
            <button onClick={logout} className="bg-zinc-700 px-5 py-2 rounded-md text-white  hover:bg-zinc-600 cursor-pointer">Logout</button>
            <button onClick={getUser} className="bg-green-600 px-5 py-2 rounded-md text-white hover:bg-green-700 cursor-pointer">Get User Details</button>
      </div>

        </div>


        {/* About Me Section */}
        <div className="border-t-2 border-gray-600 pt-6">
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="text-sm text-gray-400 mt-2">
            I am a passionate web developer with a focus on building interactive and responsive user interfaces. I enjoy working with modern technologies like React and Tailwind CSS. Always eager to learn and take on new challenges.
          </p>
        </div>
      </div>
    </div>
  );
}
