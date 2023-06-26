"use client";
import { useState } from "react";
import axios from "axios";
import Title from "./parts/Title";
import InputText from "./parts/InputText";
import InputNumber from "./parts/InputNumber";
import InputEmail from "./parts/InputEmail";
import Buttons from "./parts/Buttons";

export default function Edit({ item }) {
  // -----------------------------------------------
  const [product, setProduct] = useState(item.product);
  const [category, setCategory] = useState(item.category);
  const [stock, setStock] = useState(item.stock);
  const [price, setPrice] = useState(item.price);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();
    setIsMutating(true);
    try {
      // -----------------------------------------------
      await axios.patch(`http://localhost:5003/stockdata/${item.id}`, {
        product: product,
        category: category,
        stock: stock,
        price: price,
      });
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
          <Title />
          <form className="h-full w-full" onSubmit={handleEdit}>
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
              label={"Category"}
            />
            <InputNumber
              id={"stock"}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              label={"Stock"}
            />
            <InputText
              id={"price"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label={"Price"}
            />
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
            <Buttons onClick={hideHandler} isMutating={isMutating} />
          </form>
        </div>
      </div>
    </>
  );
}
