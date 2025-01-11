import React, { useEffect, useState } from "react";
import { Card, EmptyScreen, NavBar } from "../components";
import { getMethod } from "../Utility/http-services";
import { Skeleton } from "antd";

export default function Blog() {
  const [blogs, setBlogs] = useState();
  const [isLoading, setLoading] = useState(true);
  const getBlogs = async () => {
    setLoading(true);
    try {
      const request = {
        endpoint: "api/blogs",
      };
      const { data } = await getMethod(request);
      setBlogs(data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);

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
          <div className="  ">
            {blogs.length > 0 ? (
              <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                {blogs.map((blog, index) => {
                  return <Card blog={blog} key={index} />;
                })}
              </div>
            ) : (
              <EmptyScreen />
            )}
          </div>
        )}
      </div>
    </>
  );
}
