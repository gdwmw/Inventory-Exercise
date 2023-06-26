"use client";
import { useState } from "react";
import { BsDatabaseFillAdd } from "react-icons/bs";
import axios from "axios";

export default function AddData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsMutating(true);

    try {
      await axios.post("http://localhost:5001/userdata", {
        name: name,
        email: email,
        password: password,
        role: role,
      });

      setIsMutating(false);
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setHide("none");
      location.reload();
    } catch (error) {
      console.error(error);
      setIsMutating(false);
    }
  }

  function hideHandler() {
    if (hide === "none") {
      setHide("");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    } else {
      setHide("none");
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
    }
  }

  return (
    <>
      {/* ADD DATA BUTTON */}
      <button
        className="ml-auto mr-5 rounded bg-[#7367f0] px-4 py-2 hover:bg-[#7367f0]/80"
        onClick={hideHandler}
      >
        <span className="flex select-none items-center justify-center text-white">
          <BsDatabaseFillAdd size={20} className="mr-2" /> Add Data
        </span>
      </button>
      {/* ADD DATA BUTTON */}

      <div
        className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
        style={{ display: hide }}
      >
        <div className="flex h-fit w-[500px] flex-col items-center justify-center rounded-md bg-white p-10">
          {/* TITLE */}
          <p className="mb-5 select-none whitespace-nowrap text-center text-3xl font-bold text-black">
            <span className="flex items-center justify-center">
              <BsDatabaseFillAdd size={30} className="mr-3" />
              USER DATA
            </span>
          </p>
          {/* TITLE */}

          <form className="h-full w-full" onSubmit={handleSubmit}>
            {/* INPUT NAME */}
            <div className="relative mt-6 flex w-full flex-col justify-center text-black">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="peer/txtname h-10 w-full rounded-md border-2 border-black bg-transparent px-3 outline-none focus:border-[#7367f0]"
              />
              <label
                htmlFor="name"
                className="absolute -top-6 select-none peer-focus/txtname:text-[#7367f0]"
              >
                Full Name
              </label>
            </div>
            {/* INPUT NAME */}

            {/* INPUT EMAIL */}
            <div className="relative mt-6 flex w-full flex-col justify-center text-black">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer/txtemail h-10 w-full rounded-md border-2 border-black bg-transparent px-3 outline-none focus:border-[#7367f0]"
              />
              <label
                htmlFor="email"
                className="absolute -top-6 select-none peer-focus/txtemail:text-[#7367f0]"
              >
                Email
              </label>
            </div>
            {/* INPUT EMAIL */}

            {/* INPUT PASSWORD */}
            <div className="relative mt-6 flex w-full flex-col justify-center text-black">
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer/txtpassword h-10 w-full rounded-md border-2 border-black bg-transparent px-3 outline-none focus:border-[#7367f0]"
              />
              <label
                htmlFor="password"
                className="absolute -top-6 select-none peer-focus/txtpassword:text-[#7367f0]"
              >
                Password
              </label>
            </div>
            {/* INPUT PASSWORD */}

            {/* INPUT ROLE */}
            <div className="relative mt-6 flex w-full flex-col justify-center text-black">
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="peer/txtrole h-10 w-full rounded-md border-2 border-black bg-transparent px-3 outline-none focus:border-[#7367f0]"
              />
              <label
                htmlFor="role"
                className="absolute -top-6 select-none peer-focus/txtrole:text-[#7367f0]"
              >
                Role
              </label>
            </div>
            {/* INPUT ROLE */}

            {/* BUTTON */}
            <div className="mt-5 flex items-center justify-center gap-x-3">
              {/* CANCEL BUTTON */}
              <div
                className="flex h-11 w-full cursor-pointer select-none items-center justify-center rounded-md bg-red-400 font-bold text-white hover:bg-red-400/70"
                onClick={hideHandler}
              >
                Cancel
              </div>
              {/* CANCEL BUTTON */}

              {!isMutating ? (
                <button
                  type="submit"
                  className="h-11 w-full select-none rounded-md bg-[#7367f0] font-bold text-white hover:bg-[#7367f0]/70"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  className="h-11 w-full cursor-wait select-none rounded-md bg-[#7367f0] font-bold text-white hover:bg-[#7367f0]/70"
                  disabled
                >
                  Saving...
                </button>
              )}
            </div>
            {/* BUTTON */}
          </form>
        </div>
      </div>
    </>
  );
}
