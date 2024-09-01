import React from "react";
import { NavBar } from "../components";

export default function Account() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center bg-slate-300 h-[90.7vh]">
        <div className=" rounded-md p-4 shadow-md bg-white w-[50%]">
          <h1 className="text-4xl text-center font-semibold">Account</h1>
          <div className="flex flex-col gap-4">
            <label>Name</label>
            <p>Syed</p>
            <label>Email</label>
            <p>Syed</p>
            <label>Work</label>
            <p>Syed</p>
            <label>Mobile number</label>
            <p>Syed</p>
          </div>
        </div>
      </div>
    </>
  );
}
