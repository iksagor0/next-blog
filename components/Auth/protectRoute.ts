import Router from "next/router";
// import { useEffect } from "react";

export default function protectRoute(page: string = "/") {
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  // }, []);

  if (typeof window !== "undefined") {
    let token = localStorage.getItem("token");

    if (!token) {
      Router.push(`/login?auth=false&page=${page}`);
      return false;
    } else {
      return true;
    }
  }
}
