"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#265BD1] flex-col">
      <div className="bg-white rounded-xl shadow-md flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 px-8 pt-8 pb-4">
          <img src="./success.svg" alt="" />
          <h1 className="text-xl font-semibold text-black">Create an account</h1>
          <h3 className="text-sm">Lorem ipsum dolor sit amet.</h3>

          {/* Google Sign In */}
          <Button
            className="bg-[#265BD1] text-white w-[393px] py-2 flex items-center justify-center gap-2"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <img src="./google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>

          {/* Email Placeholder */}
          <Button className="bg-[#F3F3F3] text-black w-[393px] py-2">
            Continue with Email
          </Button>

          <p className="text-xs pt-2 text-center">
            creating an account means you agree to our{" "}
            <span className="text-[#265BD1] underline">Terms</span> and{" "}
            <span className="text-[#265BD1] underline">Privacy Policy</span>
          </p>
        </div>

        <div className="border-t border-gray-300 w-full text-center py-4 text-base font-semibold">
          <p>
            Already have an account?{" "}
            <span className="text-[#265BD1] underline">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
