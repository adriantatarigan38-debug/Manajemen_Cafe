"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateCredentials } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function LoginPage() {
  const router = useRouter();
  
  // Form state management
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Controlled input handlers with error clearing
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError("");
    
    // Validate credentials
    const isValid = validateCredentials(username, password);
    
    if (isValid) {
      sessionStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      setError('Username atau password salah');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Hero Section */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a3441]/95 via-[#2a3441]/85 to-[#2a3441]/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7AA8C7]/30 to-[#B8D8CA]/20 backdrop-blur-md">
              <span className="text-2xl">☕</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Cafe 28</h2>
              <p className="text-xs text-white/70">Management System</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-tight text-white">
                Warm luxury<br />
                for modern<br />
                coffee rituals.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-white/80">
                Kelola menu, pesanan, stok, dan staff cafe Anda dengan sistem manajemen modern yang nyaman dipakai seharian.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="glass-muted rounded-2xl border border-white/20 px-6 py-4 backdrop-blur-md">
                <p className="text-3xl font-black text-[#7AA8C7]">24+</p>
                <p className="text-sm text-white/70">Active Orders</p>
              </div>
              <div className="glass-muted rounded-2xl border border-white/20 px-6 py-4 backdrop-blur-md">
                <p className="text-3xl font-black text-[#B8D8CA]">4.8★</p>
                <p className="text-sm text-white/70">Rating</p>
              </div>
              <div className="glass-muted rounded-2xl border border-white/20 px-6 py-4 backdrop-blur-md">
                <p className="text-3xl font-black text-[#EDC6B8]">14</p>
                <p className="text-sm text-white/70">Staff</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-white/50">
            © 2024 Cafe 28. Modern cafe management.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] lg:w-1/2">
        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(122, 168, 199, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7AA8C7]/20 to-[#B8D8CA]/10">
              <span className="text-3xl">☕</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2a3441]">Cafe 28</h2>
              <p className="text-sm text-[#2a3441]/60">Management System</p>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7AA8C7]/20 to-[#B8D8CA]/10">
                <Icon name="mug-hot" className="h-8 w-8 text-[#7AA8C7]" />
              </div>
              <h1 className="text-3xl font-black text-soft-foreground">
                Masuk
              </h1>
              <p className="mt-2 text-sm text-soft-slate">
                Selamat datang kembali! Silakan masuk ke akun Anda.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Input */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-soft-foreground">
                  Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Icon name="user" className="h-5 w-5 text-soft-slate/60" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    disabled={isLoading}
                    className="pl-11"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-soft-foreground">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Icon name="lock" className="h-5 w-5 text-soft-slate/60" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    disabled={isLoading}
                    className="pl-11 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-soft-slate/60 hover:text-soft-slate"
                  >
                    <Icon name={showPassword ? "eye-slash" : "eye"} className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-300/50 bg-red-50/50 px-4 py-3 backdrop-blur-sm">
                  <Icon name="circle-exclamation" className="h-5 w-5 text-red-600" />
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full text-base font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="spinner" className="h-5 w-5 animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="right-to-bracket" className="h-5 w-5" />
                    Masuk ke Dashboard
                  </span>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-soft-slate">
                Demo credentials: <span className="font-semibold">adrianta</span> / <span className="font-semibold">adrianta23</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
