import React from "react";
import Login from "@/components/login/Login";

async function getAccount() {
  const res = await fetch("http://localhost:5000/account", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const accountData = await getAccount();

  return (
    <Login
      getEmail={accountData[0].email}
      getPassword={accountData[0].password}
    />
  );
}
