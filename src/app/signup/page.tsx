"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
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
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center font-bold text-purple-600">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr className="my-4" />

        <div className="mb-4">
          <label htmlFor="username" className="text-sm font-semibold">
            Username
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none ${
            buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>

        <div className="text-center mt-4">
          <Link href="/login" className="text-purple-600 hover:underline">
            Visit Login page
          </Link>
        </div>
      </div>
    </div>
  );
}
