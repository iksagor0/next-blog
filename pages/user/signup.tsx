/* eslint-disable react-hooks/rules-of-hooks */
import Auth from "@/components/Auth/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

type formObject = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const router = useRouter();
  // CHECK AUTHENTICATION
  const isLogin = Auth();
  if (isLogin) {
    router.push("/");
  }

  // STATE
  // const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState<formObject>({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT FORM
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { data } = await axios.post("/api/user/registration", form);
    console.log(data);

    if (data?.success) {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("name", data?.body.name);
      localStorage.setItem("_id", data?.body._id);
      // setErrMsg(data?.message);
      router.push("/profile");
    }
  };
  return (
    <div
      id="signup_page"
      className="grid place-content-center bg-[#2c3338] text-white"
    >
      <div className="container">
        <form
          action="#"
          method="#"
          className="login-form"
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <div className="form__field flex text-gray-500 mb-3 bg-[#3b4148]">
            <label className=" bg-slate-900 p-2 text-xl">
              <RxAvatar />
            </label>
            <input
              type="text"
              name="name"
              className="form__input bg-transparent px-2 pr-[30px] text-gray-100 overflow-hidden"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form__field flex text-gray-500 mb-3 bg-[#3b4148]">
            <label className=" bg-slate-900 p-2 text-xl">
              <AiOutlineMail />
            </label>
            <input
              type="email"
              name="email"
              className="form__input bg-transparent px-2 pr-[30px] text-gray-100 overflow-hidden"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field flex items-center text-gray-500 mb-3 bg-[#3b4148] ">
            <label className=" bg-slate-900 p-2 text-xl">
              <AiFillLock />
            </label>
            <input
              type="password"
              name="password"
              className="form__input bg-transparent px-2 pr-[30px] text-gray-100"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="">
            <input
              type="submit"
              value="Login"
              className="btn__primary block cursor-pointer w-full"
            />
          </div>
        </form>

        <p className="text-center text-xs mt-5 text-gray-400">
          Not a member?{" "}
          <Link
            href="/user/login"
            className="border_btn text-base ml-2 text-white "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
