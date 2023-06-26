"use client";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import axios from "axios";

export default function Edit({ item }) {
  const [category, setCategory] = useState(item.category);
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();

    setIsMutating(true);

    try {
      await axios.patch(`http://localhost:5002/categorydata/${item.id}`, {
        category: category,
      });

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
      {/* EDIT BUTTON */}
      <button
        className="mr-2 select-none rounded bg-[#7367f0] px-2 py-1 text-white hover:bg-[#7367f0]/70"
        onClick={hideHandler}
      >
        Edit
      </button>
      {/* EDIT BUTTON */}

      <div
        className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-black/80"
        style={{ display: hide }}
      >
        <div className="flex h-fit w-[500px] flex-col items-center justify-center rounded-md bg-white p-10">
          {/* TITLE */}
          <p className="mb-5 select-none whitespace-nowrap text-center text-3xl font-bold text-black">
            <span className="flex items-center justify-center">
              <MdEditSquare size={30} className="mr-3" />
              EDIT DATA
            </span>
          </p>
          {/* TITLE */}
          <form
            className="relative mt-6 flex w-full flex-col justify-center text-black"
            onSubmit={handleEdit}
          >
            {/* INPUT CATEGORY */}
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="peer/txtcategory h-10 w-full rounded-md border-2 border-black bg-transparent px-3 outline-none focus:border-[#7367f0]"
            />
            <label
              htmlFor="category"
              className="absolute -top-6 select-none peer-focus/txtcategory:text-[#7367f0]"
            >
              Category
            </label>
            {/* INPUT CATEGORY */}

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
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  className="h-11 w-full cursor-wait select-none rounded-md bg-[#7367f0] font-bold text-white hover:bg-[#7367f0]/70"
                  disabled
                >
                  Editing...
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
