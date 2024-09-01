import React from "react";
import { useForm } from "react-hook-form";
import { Input, PrimaryButton } from "../UI";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupValidationSchema } from "../../Utility/SchemaValidation";
import { Skeleton } from "antd";

const SignupForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupValidationSchema),
  });
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <label className="">Full Name</label>
        <Input
          isError={errors.username && true}
          props={register("username")}
          name="username"
          placeholder="Name"
          type="text"
        />
        {errors.username && (
          <p className="text-red-600 text-sm ">{errors.username.message}</p>
        )}
      </section>
      <section>
        <label className="">Mobile Number</label>
        <Input
          isError={errors.phoneNumber && true}
          props={register("phoneNumber")}
          name="phoneNumber"
          placeholder="+91 124567890"
          type="number"
        />
        {errors.phoneNumber && (
          <p className="text-red-600 text-sm ">{errors.phoneNumber.message}</p>
        )}
      </section>
      <section>
        <label className="">Email</label>
        <Input
          isError={errors.email && true}
          props={register("email")}
          name="email"
          placeholder="Email"
          type="email"
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
          type="password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm ">{errors.password.message}</p>
        )}
      </section>
      <div className="text-center">
        {isLoading ? (
          <Skeleton />
        ) : (
          <PrimaryButton type="submit" text={"Sign up"} />
        )}
        <p className="text-gray-400 text-sm my-5">
          Already have account{" "}
          <a href="/login" className="text-blue-700">
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export { SignupForm };
