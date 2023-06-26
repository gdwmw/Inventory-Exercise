"use client";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

export default function Delete({ item }) {
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  async function handleDelete(itemId) {
    setIsMutating(true);

    try {
      await axios.delete(`http://localhost:5002/categorydata/${itemId}`);

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
          {/* TITLE */}
          <p className="mb-3 select-none whitespace-nowrap text-center text-3xl font-bold text-black">
            <span className="flex items-center justify-center">
              <AiFillDelete size={30} className="mr-3" />
              DELETE DATA?
            </span>
          </p>
          {/* TITLE */}

          <div className="relative flex w-full flex-col justify-center text-black">
            {/* INDICATOR */}
            <p className="select-none text-2xl">
              <span className="font-bold">Category : </span>
              {item.category}
            </p>
            {/* INDICATOR */}

            {/* BUTTON */}
            <div className="mt-5 flex items-center justify-center gap-x-3">
              {/* CANCEL BUTTON */}
              <div
                className="flex h-11 w-full cursor-pointer select-none items-center justify-center rounded-md bg-[#7367f0] font-bold text-white hover:bg-[#7367f0]/70"
                onClick={hideHandler}
              >
                Cancel
              </div>
              {/* CANCEL BUTTON */}

              {!isMutating ? (
                <button
                  type="button"
                  className="h-11 w-full select-none rounded-md bg-red-400 font-bold text-white hover:bg-red-400/70"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              ) : (
                <button
                  type="button"
                  className="h-11 w-full cursor-wait select-none rounded-md bg-red-400 font-bold text-white hover:bg-red-400/70"
                  disabled
                >
                  Deleting...
                </button>
              )}
            </div>
            {/* BUTTON */}
          </div>
        </div>
      </div>
    </>
  );
}
