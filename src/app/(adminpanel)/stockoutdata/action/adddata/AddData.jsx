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
  const [date, setDate] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  // -----------------------------------------------
  function emptyIt() {
    setProduct("");
    setDate("");
    setQty("");
    setPrice("");
    setTotal("");
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  async function handleSubmit(e) {
    e.preventDefault();
    setIsMutating(true);
    try {
      // -----------------------------------------------
      await axios.post("http://localhost:5005/stockoutdata", {
        product: product,
        date: date,
        qty: qty,
        price: price,
        total: total,
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
          <Title title={"STOCK OUT DATA"} />
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
              id={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              label={"Date In"}
            />
            <InputNumber
              id={"qty"}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              label={"Qty In"}
            />
            <InputNumber
              id={"price"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label={"Price/Unit"}
            />
            <InputNumber
              id={"total"}
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              label={"Total Price"}
            />
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
            <Buttons onClick={hideHandler} isMutating={isMutating} />
          </form>
        </div>
      </div>
    </>
  );
}
