"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmail() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {

        try {
            await axios.post("/api/users/verifyMail", { token })
            setVerified(true)
        } catch (error: unknown) {
            setError(true)
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log("An unknown error occurred:", error);
            }
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search;
        setToken(urlToken.split("=")[1] || "")
        console.log(urlToken.split("=")[1])
    },[])


    useEffect(() => {
        if (token.length>0) {
            verifyUserEmail()
        }
    }, [token])


    return     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center space-y-6">
      <h1 className="text-3xl font-bold text-orange-500">Verify Email</h1>
      <h2 className="text-lg text-gray-300">
        {token ? (
          <>
            <span className="bg-green-700 text-white p-2 rounded-md font-bold font-mono">{token}</span>
          </>
        ) : (
          "No Token"
        )}
      </h2>

      {verified && (
        <div className="bg-green-900 p-4 rounded-lg">
          <h2 className="text-lg text-white font-bold">Email Verified ✔️</h2>
          <Link
            href="/login"
            className="inline-block mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition"
          >
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="bg-red-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-red-300">Error Occurred ❌</h2>
        </div>
      )}
    </div>
  </div>

    {/* <div>
        <h1>Verify Email</h1>
        <h2>{token ? token : "No Token"}</h2>

        {verified && <div>
            <h2>Email Verified</h2>
            <Link href={"/login"}> Login </Link>
        </div> }
       
        {error && <div>
            <h2>Error Occured</h2>
        </div> }
    </div>
    </> */}

}
