import React, { useEffect, useState } from "react";
import { Card, NavBar } from "../components";
import { postMethod } from "../Utility/http-services";
import { Skeleton } from "antd";
import { USER } from "../Utility/variable";

export default function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const localData = localStorage.getItem(USER);
  const getUserData = JSON.parse(localData);
  const getBlogs = async () => {
    const payload = {
      userID: getUserData.id
    };
    try {
      const request = {
        endpoint: "api/userblogs",
        payload: payload,
      };
      const { data } = await postMethod(request);
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

      <div className="xl:px-20 md:px-20 lg:px-20 px-5 py-10 bg-slate-200">
        <h1 className="text-3xl my-4 text-center">My blogs</h1>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col gap-10">
            {blogs.map((blog, index) => {
              return <Card key={index} blog={blog} index={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
