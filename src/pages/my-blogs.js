import React, { useEffect, useState } from "react";
import { Card, NavBar } from "../components";
import { postMethod } from "../Utility/http-services";
import { Skeleton } from "antd";
import { USER } from "../Utility/variable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNotification } from "../hooks/useNotification";

export default function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const localData = localStorage.getItem(USER);
  const getUserData = JSON.parse(localData);
  const { success, contextHolder, error } = useNotification();
  const getBlogs = async () => {
    const payload = {
      userID: getUserData.id,
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
  const deleteBlog = async (id) => {
    setLoading(true)
    const request = {
      endpoint: "api/delete",
      payload: {
        slug: id,
      },
    };
    try {
      const { data } = await postMethod(request);
      success("deleted");
      getBlogs();
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="xl:px-20 md:px-20 lg:px-20 px-5 py-10 bg-slate-200">
        <h1 className="text-3xl my-4 text-center">My blogs</h1>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col gap-10">
            {blogs.length > 0 ? (
              <>
                {blogs.map((blog, index) => {
                  return (
                    <div key={index} className="bg-white p-2 rounded-md">
                      <div className="flex justify-end gap-4 px-2 my-5 text-xl">
                        <a href={`/create-blog/${blog.slug}`}  className=" cursor-pointer" >
                        <EditOutlined/>
                        </a>
                        <DeleteOutlined
                          className="cursor-pointer"
                          onClick={() => {
                            deleteBlog(blog.slug);
                          }}
                        />
                      </div>
                      <h1 className="text-2xl my-2 text-green-500">
                        {blog.title}
                      </h1>
                      <div
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="my-5 text-xl ">
                <p>No Blogs</p>
                <a href="/create-blog" className="text-blue-600">
                  Post blog
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
