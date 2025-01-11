import React, { useEffect, useState } from "react";
import { Input, NavBar, PrimaryButton } from "../components";
import { CreateBlogValidationSchema } from "../Utility/SchemaValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { getMethod, postMethod, putMethod } from "../Utility/http-services";
import { USER } from "../Utility/variable";
import { useNotification } from "../hooks/useNotification";
import { Skeleton } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateBlog() {
  const { success, contextHolder, error } = useNotification();
  const { slug } = useParams();
  const [isLoading, setLoading] = useState();
  const [blogData, setBlogData] = useState();
  const navigate = useNavigate();

  // validation
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateBlogValidationSchema),
  });

  // base64
  const [base64Image, setBase64Image] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // Base64 string
      };
      reader.readAsDataURL(file); // Converts the file to base64
    }
  };

  const getBlog = async () => {
    try {
      const request = {
        endpoint: `api/getBlog/${slug}`,
      };
      const { data } = await getMethod(request);
      setBlogData(data.data);
      setValue("title", data.data.title);
      setValue("description", data.data.description);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (slug) {
      getBlog();
    }
  }, []);

  const onSubmit = async (data) => {
    // setLoading(true);
    const date = new Date();
    const formData = data;
    const titleSlug = data.title.replaceAll(" ", "-");
    const localData = localStorage.getItem(USER);
    const getUserData = JSON.parse(localData);
    try {
      const payload = {
        ...formData,
        postBy: getUserData.userName,
        postDate: dayjs(date).format("DD-MM-YYYY"),
        userEmail: getUserData.userEmail,
        userID: getUserData.id,
        image: slug ? blogData.image : base64Image,
        slug: titleSlug,
      };
      const request = {
        endpoint: slug ? `api/update/${slug}` : "api/create-blog",
        payload: payload,
      };
      if (slug) {
        const { data } = await putMethod(request);
      } else {
        const { data } = await postMethod(request);
      }
      if (slug) {
        navigate("/");
      }
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
  console.log(blogData?.title);

  return (
    <>
      {contextHolder}
      <NavBar />
      <div className="xl:w-[50%] lg:w-[50%] md:w-[50%] w-[90%] m-auto mt-10">
        <h1 className="text-4xl text-center my-5 ">Post a blog</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label className="">
              Title <span className="text-red-600">*</span>
            </label>
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
          <label className="my-0">Image</label>
          <input
            type="file"
            name="file"
            disabled={slug ? true : false}
            onChange={handleImageUpload}
            className={`bg-white p-2 rounded-md ${
              slug && "cursor-not-allowed"
            }`}
          />

          <section>
            <label className="">
              Description<span className="text-red-600">*</span>
            </label>
            {/* <textarea
              className=" block w-full p-2 border-blue-500 border rounded-md"
              rows={5}
              placeholder="Description"
              {...register("description")}
            /> */}
            <div className="h-[192px] bg-white">
              <ReactQuill
                theme="snow"
                value={blogData?.description}
                onChange={(e) => {
                  // console.log(e);
                  setValue("description", e);
                }}
                className="h-[150px] rounded-lg"
              />
            </div>
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
