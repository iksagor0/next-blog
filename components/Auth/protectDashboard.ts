import Router from "next/router";
// import { useEffect, useState } from "react";

export default function protectDashboard(page: string = "/") {
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   let getToken = localStorage.getItem("token") ?? "";
  //   setToken(getToken);
  // }, []);

  if (typeof window !== "undefined") {
    let token = localStorage.getItem("token") ?? "";
    let role = localStorage.getItem("role") ?? "";

    if (token && role === "ADMIN") {
      return true;
    } else {
      Router.push(`/user/login`);
      return false;
    }
  }
}
