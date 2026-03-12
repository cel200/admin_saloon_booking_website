"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Scissors, ArrowRight, Lock, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/adminThunk";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading,error } = useSelector((state) => state.auth);
  console.log("user",user)
  console.log("error",error)
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    // setLoading(true);
    // Simulate login
    if(user?.token) {
        Cookies.set("token",user.token)
      router.push("/dashboard");
      }
    setTimeout(() => {
      if(user){
        alert(user.message)
      }
      else{
        alert(error)
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card glass animate-fade-in">
        <div className="brand">
          <div className="logo-icon">
            <Scissors size={28} color="white" />
          </div>
          <h1>
            Luxe<span className="text-accent">Salon</span>
          </h1>
        </div>

        <p className="subtitle">Welcome back! Please access your account.</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="admin@luxesalon.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
