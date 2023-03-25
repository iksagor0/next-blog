import Router from "next/router";
// import { useEffect, useState } from "react";

export default function protectRoute(page: string = "/") {
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   let getToken = localStorage.getItem("token") ?? "";
  //   setToken(getToken);
  // }, []);

  if (typeof window !== "undefined") {
    let token = localStorage.getItem("token") ?? "";

    if (token) {
      return true;
    } else {
      Router.push(`/user/login`);
      return false;
    }
  }
}
