"use client";
import { useState } from "react";
import { BsDatabaseFillAdd } from "react-icons/bs";
import axios from "axios";
import Title from "./parts/Title";
import InputText from "./parts/InputText";
import InputNumber from "./parts/InputNumber";
import InputEmail from "./parts/InputEmail";
import Buttons from "./parts/Buttons";

export default function AddData() {
  // -----------------------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  // -----------------------------------------------
  function emptyIt() {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  async function handleSubmit(e) {
    e.preventDefault();
    setIsMutating(true);
    try {
      // -----------------------------------------------
      await axios.post("http://localhost:5001/userdata", {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      setIsMutating(false);
      emptyIt();
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
      emptyIt();
    } else {
      setHide("none");
      emptyIt();
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
          {/* ----------------------------------------------- */}
          <Title title={"USER DATA"} />
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
          <form className="h-full w-full" onSubmit={handleSubmit}>
            {/* ----------------------------------------------- */}
            <InputText
              id={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={"Full Name"}
            />
            <InputEmail
              id={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
            />
            <InputText
              id={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
            />
            <InputText
              id={"role"}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label={"Role"}
            />
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
            <Buttons onClick={hideHandler} isMutating={isMutating} />
          </form>
        </div>
      </div>
    </>
  );
}
