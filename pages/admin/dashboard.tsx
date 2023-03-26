import axios from "axios";
import { useEffect, useState } from "react";

export default function dashboard() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async (limit: number = 10) => {
    //   Can I end Body in get method?
    const { data } = await axios.get("/api/blog/get/all", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    // console.log(data.body);
    setBlogs(data.body);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approvalBlog = async (id: string, status: string) => {
    const { data } = await axios.put(
      "/api/blog/update",
      { _id: [id], approval: status }, // Body
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    fetchData();
  };

  return (
    <section className="mt-10">
      <div className="container">
        <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

        {/* ================== */}
        <div className="blog_table_container">
          <table className="w-full" border={"#000"}>
            <thead>
              <tr>
                <th className="index_head">No.</th>
                <th className="title_head">Title</th>
                <th className="category_head">Category</th>
                <th className="approval_head">Approval Status</th>
                <th className="CTA_Buttons w-[350px]">Control Buttons</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr className="" key={blog?._id ?? index}>
                  <td className="index text-center">{index + 1}</td>
                  <td className="title ">{blog?.title}</td>
                  <td className="category text-center">{blog?.category}</td>
                  <td className="approval text-center">
                    <div>{blog?.approval}</div>
                  </td>

                  <td className="approval_btn_container  grid grid-cols-4">
                    <button
                      className="bg-green-700"
                      disabled={blog.approval === "Approved"}
                      onClick={() => approvalBlog(blog._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-yellow-600"
                      disabled={blog.approval === "Pending"}
                      onClick={() => approvalBlog(blog._id, "Pending")}
                    >
                      Hide
                    </button>
                    <button
                      className="bg-red-700 text-gray-200"
                      disabled={blog.approval === "Rejected"}
                      onClick={() => approvalBlog(blog._id, "Rejected")}
                    >
                      Reject
                    </button>
                    <button className="bg-red-800 text-gray-200">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
