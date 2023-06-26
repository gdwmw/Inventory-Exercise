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
  const [date, setDate] = useState(item.date);
  const [qty, setQty] = useState(item.qty);
  const [price, setPrice] = useState(item.price);
  const [total, setTotal] = useState(item.total);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  const [hide, setHide] = useState("none");
  const [isMutating, setIsMutating] = useState(false);

  async function handleEdit(e) {
    e.preventDefault();
    setIsMutating(true);
    try {
      // -----------------------------------------------
      await axios.patch(`http://localhost:5004/stockindata/${item.id}`, {
        product: product,
        date: date,
        qty: qty,
        price: price,
        total: total,
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
