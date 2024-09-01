import React from "react";
import { useForm } from "react-hook-form";
import { Input, PrimaryButton } from "../UI";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "../../Utility/SchemaValidation";
import { Skeleton } from "antd";

const LoginForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidationSchema),
  });
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="">Email</label>
        <Input
          isError={errors.email && true}
          props={register("email")}
          name="email"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-600 text-sm ">{errors.email.message}</p>
        )}
      </section>
      <section>
        <label className="">Password</label>
        <Input
          isError={errors.password && true}
          props={register("password")}
          name="password"
          placeholder="Password"
          type={'password'}
        />
        {errors.password && (
          <p className="text-red-600 text-sm ">{errors.password.message}</p>
        )}
      </section>
      <div className="text-center">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <PrimaryButton type="submit" text={"Login"} />
        )}
        <div className="text-gray-400 text-sm my-5">
          Creat account{" "}
          <a href="/signup" className="text-blue-700">
            Sign up
          </a>
          <a href="/" className="text-blue-700 mx-2">
            Home
          </a>
        </div>
      </div>
    </form>
  );
};

export { LoginForm };
