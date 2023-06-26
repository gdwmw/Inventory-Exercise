import React from "react";

export default function InputNumber({ id, value, onChange, label }) {
  return (
    <>
      <div className="relative mt-6 flex w-full flex-col justify-center text-black">
        <input
          type="number"
          id={id}
          value={value}
          onChange={onChange}
          required
          className="peer/label h-10 w-full rounded-md border-2 border-black bg-transparent px-3 outline-none focus:border-[#7367f0]"
        />
        <label
          htmlFor={id}
          className="absolute -top-6 select-none peer-focus/label:text-[#7367f0]"
        >
          {label}
        </label>
      </div>
    </>
  );
}
