import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await registerUser(name, email, password);
        setError("Registration successful!");
        setTimeout(() => {
          setIsRegister(false);
          setName("");
          setEmail("");
          setPassword("");
          setError("");
        }, 1500);
      } else {
        await loginUser(email, password);
        navigate("/todos");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = error.includes("successful");

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-blue-600 rounded-xl mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{isRegister ? "Join Now" : "Welcome Back"}</h1>
            <p className="text-slate-400">{isRegister ? "Create your account" : "Sign in to your account"}</p>
          </div>
          {error && <div className={isSuccess ? "mb-4 p-3 rounded-lg text-sm bg-green-900 text-green-200" : "mb-4 p-3 rounded-lg text-sm bg-red-900 text-red-200"}>{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isRegister && <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-500 border border-slate-600 focus:border-blue-500 outline-none" />}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-500 border border-slate-600 focus:border-blue-500 outline-none" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-500 border border-slate-600 focus:border-blue-500 outline-none" />
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
              {loading && <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle></svg>}
              {isRegister ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="text-slate-400 text-center text-sm mt-4">{isRegister ? "Already have an account?" : "No account?"} <button onClick={() => { setIsRegister(!isRegister); setError(""); }} className="text-blue-400 hover:text-blue-300 font-semibold">{isRegister ? "Sign In" : "Sign Up"}</button></p>
        </div>
      </div>
    </div>
  );
}
