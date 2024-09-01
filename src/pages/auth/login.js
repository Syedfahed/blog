import React, { useState } from "react";
import { LoginForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { postMethod } from "../../Utility/http-services";
import { AUTH, USER } from "../../Utility/variable";
import { decodeToken } from "react-jwt";
import { useNotification } from "../../hooks/useNotification";
export default function Login() {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { contextHolder, error, success } = useNotification();
  const onSubmit = async (data) => {
    // console.log(data);
    // navigate('/home');
    setLoading(true);
    const payload = data;
    try {
      const require = {
        endpoint: "api/login",
        payload: payload,
      };
      const { data } = await postMethod(require);
      const userDecodeData = decodeToken(data.token);
      localStorage.setItem(AUTH, data.token);
      localStorage.setItem(USER, JSON.stringify(userDecodeData));
      setLoading(false);
      // console.log(userDecodeData);
      success("Login success");
      navigate("/");
    } catch (err) {
      setLoading(false);
      error('Network faild');
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center w-full items-center h-[100vh]">
      {contextHolder}
      <img src="/images/Blog_pic.png" className="w-[300px] h-auto" alt="blog" />
      <div className="max-w-lg w-full ">
        <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
