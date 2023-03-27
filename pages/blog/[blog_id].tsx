/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Blog({ blog }) {
  const router = useRouter();
  console.log(router.query?.blog_id);
  console.log(blog);

  return (
    <section id="blog">
      <div className="container">
        <img src={"/blog.jpeg"} alt="blog_image" className="img my-3" />

        <h1 className="text-3xl text-center my-3 font-bold">{blog?.title}</h1>
        <p className="text-xl">{blog?.description}</p>
      </div>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { blog_id: "641b1947d30c6be96e0dba16" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context.params?.blog_id);
  const { data } = await axios.get(
    `http://localhost:3000/api/blog/get/one?_id=${context.params?.blog_id}`
  );

  return {
    props: {
      blog: data.body,
    },
  };
};