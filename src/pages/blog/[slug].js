import React, { useEffect, useState } from "react";
import { EmptyScreen, NavBar } from "../../components";
import { getMethod } from "../../Utility/http-services";
import { Skeleton } from "antd";
import { useParams } from "react-router";
import { CaretLeftOutlined, UserOutlined } from "@ant-design/icons";

export default function BlogDetail() {
  const { slug } = useParams();
  //   console.log(slug);

  const [blog, setBlogs] = useState();
  const [isLoading, setLoading] = useState(true);
  const getBlogs = async () => {
    setLoading(true);
    try {
      const request = {
        endpoint: `api/getBlog/${slug}`,
      };
      const { data } = await getMethod(request);
      setBlogs(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <NavBar />
      <div className="xl:p-10 lg:p-10 md:p-10 p-5 bg-slate-200">
        {isLoading ? (
          <div>
            <Skeleton active />
            <p className="text-center text-xl font-bold m-4">
              Place wait server is starting
            </p>
          </div>
        ) : (
          <div className="">
            <div className="mb-5 block">
              <a href="/" className="hover:underline">
                <CaretLeftOutlined /> Back
              </a>
            </div>
            <h1 className="mb-4 text-green-500 text-3xl font-bold">
              {blog.title}
            </h1>
            <img src={blog.image || "/images/blog.jpg"} alt="blog" />
            <div className="flex gap-2 items-center">
              <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center my-4">
                <UserOutlined className="text-black text-2xl" />
              </div>
              <div className="text-sm">
                <p>{blog.postBy}</p>
                <p className="text-gray-400">Date:{blog.postDate}</p>
              </div>
            </div>
            <div
              className="py-3 "
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        )}
      </div>
    </>
  );
}
