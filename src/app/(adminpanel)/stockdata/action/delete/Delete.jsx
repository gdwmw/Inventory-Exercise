"use client";
import { useState } from "react";
import axios from "axios";
import Title from "./parts/Title";
import Indicator from "./parts/Indicator";
import Buttons from "./parts/Buttons";

export default function Delete({ item }) {
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  async function handleDelete(itemId) {
    setIsMutating(true);
    try {
      // -----------------------------------------------
      await axios.delete(`http://localhost:5003/stockdata/${itemId}`);
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      setIsMutating(false);
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
    } else {
      setHide("none");
    }
  }

  return (
    <>
      {/* DELETE BUTTON */}
      <button
        className="select-none rounded bg-red-400 px-2 py-1 text-white hover:bg-red-400/70"
        onClick={hideHandler}
      >
        Delete
      </button>
      {/* DELETE BUTTON */}
      <div
        className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
        style={{ display: hide }}
      >
        <div className="flex h-fit w-[500px] flex-col items-center justify-center rounded-md bg-white p-10">
          <Title />
          <div className="relative flex w-full flex-col justify-center text-black">
            {/* ----------------------------------------------- */}
            <Indicator indicator={"Product"} item={item.product} />
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
            <Buttons
              onClick1={hideHandler}
              onClick2={() => handleDelete(item.id)}
              isMutating={isMutating}
            />
          </div>
        </div>
      </div>
    </>
  );
}
