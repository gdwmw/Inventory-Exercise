"use client";

import { useState } from "react";
// import { useRouter } from "next/router";

export default function Login() {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [indicator, setIndicator] = useState("");

  const authentication = (e) => {
    e.preventDefault();
    if (email === "admin" && password === "123456") {
      // router.push("/test");
    } else {
      setIndicator("Invalid Email or Password");
      setPassword("");
    }
  };

  return (
    <main className="bg-[#2f3349] w-screen h-screen flex items-center justify-center">
      <div className="w-[450px] h-[450px] rounded-xl flex flex-col justify-center items-center">
        {/* TITLE */}
        <p className="text-3xl font-bold mb-8 text-white">-- INVENTORY --</p>
        {/* TITLE */}

        <form onSubmit={authentication} className="flex w-80 flex-col gap-y-3 justify-center items-center">
          {/* INPUT EMAIL */}
          <div className="relative mt-6 flex flex-col w-full justify-center text-white">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full peer/txtemail h-10 px-3 rounded-md border-2 border-white bg-transparent outline-none focus:border-[#7367f0]"
            />
            <label htmlFor="email" className="absolute -top-6 peer-focus/txtemail:text-[#7367f0]">
              Email
            </label>
          </div>
          {/* INPUT EMAIL */}

          {/* INPUT PASSWORD */}
          <div className="relative mt-6 flex flex-col justify-center w-full text-white">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full peer/txtpassword h-10 px-3 rounded-md border-2 border-white bg-transparent outline-none focus:border-[#7367f0]"
            />
            <label htmlFor="password" className="absolute -top-6 peer-focus/txtpassword:text-[#7367f0]">
              Password
            </label>
          </div>
          {/* INPUT PASSWORD */}

          {/* INDICATOR */}
          <p className="text-red-500 text-lg my-2">{indicator}</p>
          {/* INDICATOR */}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="font-bold bg-[#7367f0] text-white hover:bg-[#7367f0]/70 w-full h-11 rounded-md">
            LOGIN
          </button>
          {/* SUBMIT BUTTON */}
        </form>

        {/* COPYRIGHT */}
        <p className="mt-10 select-none text-gray-400">&copy; Copyright 2023</p>
        {/* END COPYRIGHT */}
      </div>
    </main>
  );
}
