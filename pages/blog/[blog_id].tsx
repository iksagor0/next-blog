/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Blog({ blog }: any) {
  const router = useRouter();

  return (
    <section id="blog">
      <div className="container pt-10">
        {/* <img src={"/blog.jpeg"} alt="blog_image" className="img my-3" /> */}

        <h1 className="text-5xl text-center my-3 mb-8 font-bold leading-[60px]">
          {blog?.title}
        </h1>
        <article
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: blog?.description }}
        ></article>
      </div>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { blog_id: "6421b2ba193779d394f2b2c2" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/blog/get/one?_id=${context.params?.blog_id}`
  );

  return {
    props: {
      blog: data.body,
    },
  };
};
