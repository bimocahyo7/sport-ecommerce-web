"use client";

import Button from "@/app/(landing)/components/ui/button";
import Image from "next/image";
import { login } from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/products");
    }
  }, [router]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const data = await login({ email, password });

      if (data.token) {
        router.push("/admin/products");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went error, please try again later";
      setErrorMessage(errorMessage);

      console.error("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-slate-200 w-full min-h-screen flex justify-center items-center">
      <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary py-8 px-18">
        <Image src="/images/logo-admin.svg" alt="logo admin" width={304} height={51} className="mx-auto mb-4" />
        <p className="text-slate-600 text-sm text-center mb-7">Enter your credentials to access the dashboard</p>

        {errorMessage && (
          <div className="px-3 py-2 bg-primary-light border border-primary rounded-md text-primary text-sm text-center w-full mb-4">
            {errorMessage}
          </div>
        )}

        <div className="input-group-admin mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="admin@example.com"
            className="rounded-lg!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group-admin mb-12">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="rounded-lg! w-full pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <Button className="w-full rounded-lg! mb-8 font-medium" onClick={handleLogin}>
          {isLoading ? "Signing in ..." : "Sign In"}
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
