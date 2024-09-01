import React, { useState } from "react";
import { Input, NavBar, PrimaryButton } from "../components";
import { CreateBlogValidationSchema } from "../Utility/SchemaValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { postMethod } from "../Utility/http-services";
import { USER } from "../Utility/variable";
import { useNotification } from "../hooks/useNotification";
import { Skeleton } from "antd";
export default function CreateBlog() {
  const { success, contextHolder, error } = useNotification();
  const [isLoading, setLoading] = useState();
  // validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateBlogValidationSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const date = new Date();
    const formData = data;
    const localData = localStorage.getItem(USER);
    const getUserData = JSON.parse(localData);
    try {
      const payload = {
        ...formData,
        postBy: getUserData.userName,
        postDate: dayjs(date).format("DD-MM-YYYY"),
        userEmail: getUserData.userEmail,
        userID: getUserData.id,
      };
      const request = {
        endpoint: "api/create-blog",
        payload: payload,
      };
      const { data } = await postMethod(request);
      reset();
      setLoading(false);
      success(data.message);
      // console.log(data);
      
    } catch (err) {
      console.log(error);
      error("Network Faild");
      setLoading(false);
    }
  };
  return (
    <>
      {contextHolder}
      <NavBar />
      <div className="w-[50%] m-auto mt-10">
        <h1 className="text-4xl text-center my-5 ">Post a blog</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label className="">Title</label>
            <Input
              isError={errors.title && true}
              props={register("title")}
              name="title"
              placeholder="Name"
              type="text"
            />
            {errors.title && (
              <p className="text-red-600 text-sm ">{errors.title.message}</p>
            )}
          </section>
          <section>
            <label className="">Description</label>
            <textarea
              className=" block w-full p-2 border-blue-500 border rounded-md"
              rows={5}
              placeholder="Description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-600 text-sm ">
                {errors.description.message}
              </p>
            )}
          </section>

          <div className="text-center">
            {isLoading ? (
              <Skeleton active />
            ) : (
              <PrimaryButton type="submit" text={"Post"} />
            )}
          </div>
        </form>
      </div>
    </>
  );
}
