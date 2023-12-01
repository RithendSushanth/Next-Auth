"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Invalid token");
      router.push("/login"); // Redirect to login page if there's no token
    }
  }, [searchParams]);

  const handleResetPassword = async () => {
    try {
      const token = searchParams.get("token");

      // Api call to reset password
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
        confirmPassword,
      });
      console.log("Password reset success", response.data);
      toast.success("Password reset success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Password Reset Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center font-bold text-purple-600">
          {loading ? "Processing" : "Reset Password"}
        </h1>
        <hr className="my-4" />

        <div className="mb-4">
          <label htmlFor="password" className="text-sm font-semibold">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            placeholder="New Password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
            placeholder="Confirm Password"
          />
        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
