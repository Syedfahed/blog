import React, { useState } from "react";
import { SignupForm } from "../../components";
import { postMethod } from "../../Utility/http-services";
import { AUTH } from "../../Utility/variable";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
export default function Signup() {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { contextHolder, success, error } = useNotification();
  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    const payload = data;
    try {
      const request = {
        endpoint: "api/signup",
        payload: payload,
      };
      const { data } = await postMethod(request);
      navigate("/login");
      setLoading(false);
      success("Signup successfull");
      // console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(error);
      error("Network faild");
    }
  };
  return (
    <div className="flex flex-col justify-center w-full items-center h-[100vh]">
      {contextHolder}
      <img src="/images/Blog_pic.png" className="w-[300px] h-auto" alt="blog" />
      <div className="max-w-lg w-full ">
        <SignupForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
