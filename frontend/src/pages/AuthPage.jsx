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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-pink-500/15 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-cyan-500/15 rounded-full blur-xl animate-bounce" style={{animationDelay: '3s'}}></div>
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 transform transition-all duration-300 hover:shadow-blue-500/10 hover:shadow-2xl relative overflow-hidden">
          {/* Card background effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/8 to-pink-500/8 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-lg"></div>
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl transform transition-transform duration-300 hover:scale-105">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-slate-400 text-lg">
              {isRegister ? "Join our community and start organizing" : "Sign in to continue your journey"}
            </p>
          </div>
          {error && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
              isSuccess
                ? "bg-green-900/50 text-green-200 border border-green-700/50"
                : "bg-red-900/50 text-red-200 border border-red-700/50"
            }`}>
              <div className="flex items-center gap-2">
                {isSuccess ? (
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {error}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="relative">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-5 py-4 bg-slate-700/50 rounded-xl text-white placeholder-slate-500 border border-slate-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/70" />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}

            <div className="relative">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-5 py-4 pl-12 bg-slate-700/50 rounded-xl text-white placeholder-slate-500 border border-slate-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/70" />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-5 py-4 pl-12 bg-slate-700/50 rounded-xl text-white placeholder-slate-500 border border-slate-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 backdrop-blur-sm hover:bg-slate-700/70" />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]">
              {loading && <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              {isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>
          <div className="text-center mt-8">
            <p className="text-slate-400">
              {isRegister ? "Already have an account?" : "Don't have an account?"}
              <button onClick={() => { setIsRegister(!isRegister); setError(""); setName(""); setEmail(""); setPassword(""); }} className="text-blue-400 hover:text-blue-300 font-semibold ml-2 transition-colors duration-300">
                {isRegister ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
