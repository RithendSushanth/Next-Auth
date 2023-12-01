"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("Error response data:", error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  console.log("Verified state:", verified);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md h-full lg:max-h-56 lg:max-w-46 md:max-h-56 md:max-w-46 sm:max-h-36 sm:max-w-36 max-h-full max-w-full">
        <h1 className="text-4xl mb-4 text-center font-bold text-purple-600 flex inline">Verify Email</h1>
        <div className="flex flex-wrap  w-100 sm:w-36">
          <h2 className="text-sm sm:text-xl w-100 p-2 rounded bg-orange-300 text-black text-xs">{token ? `${token}` : "No token"}</h2>
        </div>

        {verified && (
          <div className="mt-4">
            <h2 className="text-2xl text-green-600">Email Verified</h2>
            <Link href="/login">
              <div className="mt-2 block text-blue-500 hover:underline">Login</div>
            </Link>
          </div>
        )}

        {error && (
          <div className="mt-4">
            <h2 className="text-2xl bg-red-500 text-white p-2 rounded">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
