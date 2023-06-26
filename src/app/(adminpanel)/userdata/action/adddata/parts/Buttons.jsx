import React from "react";

export default function Buttons({ onClick, isMutating }) {
  return (
    <>
      <div className="mt-5 flex items-center justify-center gap-x-3">
        <div
          className="flex h-11 w-full cursor-pointer select-none items-center justify-center rounded-md bg-red-400 font-bold text-white hover:bg-red-400/70"
          onClick={onClick}
        >
          Cancel
        </div>
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
    </>
  );
}
