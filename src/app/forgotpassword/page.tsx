"use client"


import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        try {
            setLoading(true);
            // Send a request to your backend to initiate the password reset process
            await axios.post("/api/users/forgotpassword", { email });
            toast.success("Password reset email sent. Check your inbox.");
            router.push("/resetpassword");
        } catch (error: any) {
            console.error("Forgot Password failed:", error.message);
            toast.error("Forgot Password failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl mb-4 text-center font-bold text-purple-600">Forgot Password</h1>
                <hr className="my-4" />

                <div className="mb-4">
                    <label htmlFor="email" className="text-sm font-semibold">
                        Email
                    </label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>

                <button
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
                        }`}
                >
                    {loading ? "Sending Email..." : "Send Password Reset Email"}
                </button>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        Remember your password?{" "}
                        <span className="text-purple-600 hover:underline cursor-pointer" onClick={() => router.push("/login")}>
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
