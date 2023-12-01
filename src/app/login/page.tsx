
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center font-bold text-purple-600">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="my-4" />

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
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
        >
          Login
        </button>

        <div className="text-center mt-4">
          <Link href="/signup" className="text-purple-600 hover:underline">
            Visit Signup page
          </Link>
        </div>
        <div className="text-center mt-4">
          <Link href="/forgotpassword" className="text-purple-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
