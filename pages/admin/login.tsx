/* eslint-disable react-hooks/rules-of-hooks */
import Auth from "@/components/Auth/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

type formObject = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  // CHECK AUTHENTICATION
  const isLogin = Auth();
  if (isLogin) {
    router.push("/");
  }

  // STATE
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState<formObject>({
    email: "iksagor@gmail.com",
    password: "password",
  });

  // Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT FORM
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { data } = await axios.post("/api/admin/login", form);
    console.log(data);

    if (data?.success) {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("name", data?.body.name);
      localStorage.setItem("_id", data?.body._id);
      localStorage.setItem("role", data?.body.role);
      // setErrMsg(data?.message);

      // if (router.query?.page) {
      //   router.push(router.query.page);
      // } else {
      //   router.push("/");
      // }
      router.push("/dashboard");
    } else {
      setErrMsg(data?.message);
    }
  };

  // useEffect(() => {
  //   if (router.query?.auth) {
  //     setErrMsg("Please login first !");
  //   }
  // }, []);

  return (
    <div
      id="login_page"
      className="grid place-content-center bg-[#2c3338] text-white"
    >
      <div className="container">
        <h2
          className={`text-center my-5 text-xl text-gray-100 font-bold animated__text_none `}
        >
          Admin
        </h2>

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
      </div>
    </div>
  );
}
