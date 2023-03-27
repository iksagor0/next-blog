/* eslint-disable react-hooks/rules-of-hooks */
import Auth from "@/components/Auth/protectRoute";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const RichText = dynamic(() => import("~/RichText"), { ssr: false });

// import { AiFillLock } from "react-icons/ai";
// import { RxAvatar } from "react-icons/rx";

interface formObject {
  title: string;
  shortDes: string;
  description: string;
  category: string;
}

export default function Create() {
  const router = useRouter();
  // CHECK AUTHENTICATION
  const isLogin = Auth();
  if (!isLogin) {
    // router.push("/");
  }

  // STATE
  const [errMsg, setErrMsg] = useState("");
  const [form, setForm] = useState<formObject>({
    title: "",
    category: "",
    shortDes: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT FORM
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.description === "") {
      alert("Blog should not be empty!");
      return false;
    }

    const { data } = await axios.post("/api/blog/create", form, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    console.log(data);

    if (data?.success) {
      alert("Blog posted successfully. Please wait for admin Aprroval!");
      setForm({
        title: "",
        category: "",
        shortDes: "",
        description: "",
      });
    } else {
      alert(data?.message);
    }
  };

  useEffect(() => {
    if (router.query?.auth) {
      setErrMsg("Please login first !");
    }
  }, []);

  return (
    <section id="create_blog_page" className="bg-[#2c3338] text-white">
      <div className="container">
        <h2
          className={`text-center mb-3 text-3xl text-gray-200 font-bold animated__text_none `}
        >
          Create a Blog
        </h2>

        <form
          action="#"
          method="#"
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="form__field flex text-gray-500 mb-3 bg-[#3b4148]">
            {/* <label className=" bg-slate-900 p-2 text-xl">
              <RxAvatar />
            </label> */}
            <input
              type="text"
              name="title"
              className="w-full bg-transparent px-2 py-1 text-gray-100 overflow-hidden"
              placeholder="Blog Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__field flex items-center text-gray-500 mb-3 bg-[#3b4148] ">
            <select
              name="category"
              className="w-full bg-transparent px-2 py-1 text-gray-100 overflow-hidden"
              placeholder="Blog Title"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="" hidden defaultChecked className="text-gray-100">
                Please select blog category...
              </option>

              <option
                value="Smartphone"
                className="text-gray-100 bg-gray-800 hover:bg-black"
              >
                Smartphone
              </option>

              <option value="PC" className="text-gray-100 bg-gray-800">
                PC
              </option>
              <option value="Gaming" className="text-gray-100 bg-gray-800">
                Gaming
              </option>
              <option
                value="Tips and Tricks"
                className="text-gray-100 bg-gray-800"
              >
                Tips and Tricks
              </option>
              <option value="Programming" className="text-gray-100 bg-gray-800">
                Programming
              </option>
              <option
                value="Science & Tech"
                className="text-gray-100 bg-gray-800"
              >
                Science & Tech
              </option>
              <option value="Others" className="text-gray-100 bg-gray-800">
                Others
              </option>
            </select>
          </div>

          <div className="form__field flex items-center text-gray-500 mb-3 bg-[#3b4148] ">
            {/* <label className=" bg-slate-900 p-2 text-xl">
              <AiFillLock />
            </label> */}
            <textarea
              name="shortDes"
              className="w-full h-[100px] bg-transparent px-2 text-gray-100"
              placeholder="Write a short description about the blog"
              value={form.shortDes}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rich Text */}
          <div className="form__field flex items-center text-gray-500 mb-3 bg-[#3b4148] ">
            <RichText form={form} setForm={setForm} />
          </div>

          <div className="">
            <input
              type="submit"
              value="Post Blog"
              className="btn__primary block cursor-pointer w-full"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
