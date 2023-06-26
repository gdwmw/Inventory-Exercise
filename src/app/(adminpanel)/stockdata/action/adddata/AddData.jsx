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
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  // -----------------------------------------------
  function emptyIt() {
    setProduct("");
    setCategory("");
    setStock("");
    setPrice("");
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  async function handleSubmit(e) {
    e.preventDefault();
    setIsMutating(true);
    try {
      // -----------------------------------------------
      await axios.post("http://localhost:5003/stockdata", {
        product: product,
        category: category,
        stock: stock,
        price: price,
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
          <Title title={"STOCK DATA"} />
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
          <form className="h-full w-full" onSubmit={handleSubmit}>
            {/* ----------------------------------------------- */}
            <InputText
              id={"product"}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              label={"Product"}
            />
            <InputText
              id={"category"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label={"category"}
            />
            <InputNumber
              id={"stock"}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              label={"stock"}
            />
            <InputText
              id={"price"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label={"price"}
            />
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
            <Buttons onClick={hideHandler} isMutating={isMutating} />
          </form>
        </div>
      </div>
    </>
  );
}
