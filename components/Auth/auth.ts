import Router from "next/router";
// import { useEffect } from "react";

export default function auth() {
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  // }, []);

  if (typeof window !== "undefined") {
    let token: string | null = localStorage.getItem("token");

    return token ? true : false;
  }
}
