import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

export default function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({
    email: "sagor@email.com",
    password: "password",
  });

  // Submit Login Form
  const handleLogin = async (e: any) => {
    e.preventDefault();

    //   Post Data
    const data = await axios.post("/api/user/login", form);
    console.log(data);
    if (data?.data?.success) {
      alert("Login Successful!");
    } else {
      alert(data?.data?.message);
    }
  };

  // Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div
      id="login_page"
      className="grid place-content-center bg-[#2c3338] text-white"
    >
      <div className="container">
        <form
          action="#"
          method="#"
          className="login-form"
          onSubmit={handleLogin}
        >
          <div className="form__field flex text-gray-500 mb-3 bg-[#3b4148]">
            <label className=" bg-slate-900 p-2 text-xl">
              <RxAvatar />
            </label>
            <input
              type="email"
              name="email"
              className="form__input bg-transparent px-2 pr-3"
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
              className="form__input bg-transparent px-2 pr-3"
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
            href="/signup"
            className="border_btn text-base ml-2 text-white "
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
