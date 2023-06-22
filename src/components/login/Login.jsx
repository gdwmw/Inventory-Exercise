"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({ getEmail, getPassword }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [indicator, setIndicator] = useState("");

  const authentication = (e) => {
    e.preventDefault();
    if (email === getEmail && password === getPassword) {
      router.push("/test");
    } else {
      setIndicator("Invalid Email or Password");
      setPassword("");
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-[#2f3349]">
      <div className="flex h-[450px] w-[450px] flex-col items-center justify-center rounded-xl">
        {/* TITLE */}
        <p className="mb-8 text-3xl font-bold text-white">-- INVENTORY --</p>
        {/* TITLE */}

        <form
          onSubmit={authentication}
          className="flex w-80 flex-col items-center justify-center gap-y-3"
        >
          {/* INPUT EMAIL */}
          <div className="relative mt-6 flex w-full flex-col justify-center text-white">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer/txtemail h-10 w-full rounded-md border-2 border-white bg-transparent px-3 outline-none focus:border-[#7367f0]"
            />
            <label
              htmlFor="email"
              className="absolute -top-6 peer-focus/txtemail:text-[#7367f0]"
            >
              Email
            </label>
          </div>
          {/* INPUT EMAIL */}

          {/* INPUT PASSWORD */}
          <div className="relative mt-6 flex w-full flex-col justify-center text-white">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer/txtpassword h-10 w-full rounded-md border-2 border-white bg-transparent px-3 outline-none focus:border-[#7367f0]"
            />
            <label
              htmlFor="password"
              className="absolute -top-6 peer-focus/txtpassword:text-[#7367f0]"
            >
              Password
            </label>
          </div>
          {/* INPUT PASSWORD */}

          {/* INDICATOR */}
          <p className="my-2 text-lg text-red-500">{indicator}</p>
          {/* INDICATOR */}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="h-11 w-full rounded-md bg-[#7367f0] font-bold text-white hover:bg-[#7367f0]/70"
          >
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
