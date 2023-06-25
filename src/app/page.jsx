import React from "react";
import axios from "axios";
import Login from "@/components/login/Login";

async function getAccount() {
  try {
    const res = await axios.get("http://localhost:5000/account", {
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function page() {
  try {
    const accountData = await getAccount();

    return (
      <Login
        getEmail={accountData[0].email}
        getPassword={accountData[0].password}
      />
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
