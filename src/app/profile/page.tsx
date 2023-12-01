
'use client'
// Import necessary libraries and styles
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to get user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl sm:text-4xl mb-4 text-center font-bold text-purple-600">Welcome to Your Profile</h1>
        <hr className="my-2" />
        <p className="text-gray-700 text-center mb-4">Explore and manage your profile information</p>
        <div className="p-4 mt-4 bg-green-500 rounded text-center">
          {data === 'nothing' ? (
            "No data available"
          ) : (
            <Link href={`/profile/${data}`}>
              <h1 className="text-white font-semibold hover:underline">{data}</h1>
            </Link>
          )}
        </div>
        <hr className="my-2" />
        <div className="flex flex-col space-y-4">
          <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}

