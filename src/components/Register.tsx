"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const Register = () => {
  // ✅ State to toggle between Register & Login
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-[#265BD1]
      [background-image:radial-gradient(white_1px,transparent_1px)]
      [background-size:40px_40px] flex-col"
    >
      <div className="bg-white rounded-xl shadow-md flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 px-8 pt-8 pb-4">
          <img src="./success.svg" alt="" />
          {/* ✅ Heading changes */}
          <h1 className="text-xl font-semibold text-black">
            {isLogin ? "Login to your account" : "Create an account"}
          </h1>
          <h3 className="text-sm">
            {isLogin ? "Login to Waysorted" : "Leading the way to Waysorted"}
          </h3>

          {/* Google Sign In */}
          <Button
            className="bg-[#265BD1] cursor-pointer text-white w-[393px] py-2 flex items-center justify-center gap-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <img src="./google.svg" alt="Google" className="w-5 h-5" />
            {isLogin ? "Login with Google" : "Continue with Google"}
          </Button>

          {/* Email Placeholder */}
          <Button className="bg-[#F3F3F3] cursor-pointer text-black w-[393px] py-2 hover:text-white">
            {isLogin ? "Login with Email" : "Continue with Email"}
          </Button>

          <p className="text-xs pt-2 text-center">
            {isLogin ? (
              <>
                By logging in, you agree to our{" "}
                <span className="text-[#265BD1] underline">Terms</span> and{" "}
                <span className="text-[#265BD1] underline">Privacy Policy</span>
              </>
            ) : (
              <>
                Creating an account means you agree to our{" "}
                <span className="text-[#265BD1] underline">Terms</span> and{" "}
                <span className="text-[#265BD1] underline">Privacy Policy</span>
              </>
            )}
          </p>
        </div>

        {/* ✅ Toggle button */}
        <div className="border-t border-gray-300 w-full text-center py-4 text-base font-semibold">
          <p>
            {isLogin ? "Don’t have an account? " : "Already have an account? "}
            <span
              className="text-[#265BD1] underline cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
