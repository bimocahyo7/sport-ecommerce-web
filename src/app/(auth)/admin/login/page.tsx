"use client";

import Button from "@/app/(landing)/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="bg-slate-200 w-full min-h-screen flex justify-center items-center">
      <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary py-8 px-18">
        <Image src="/images/logo-admin.svg" alt="logo admin" width={304} height={51} className="mx-auto mb-4" />
        <p className="text-slate-600 text-sm text-center mb-9">Enter your credentials to access the dashboard</p>

        <div className="input-group-admin mb-5">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="admin@example.com" className="rounded-lg!" />
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
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer">
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <Button className="w-full rounded-lg! mb-8 font-medium" onClick={() => push("/admin/products")}>
          Sign In
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
