import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/sigiup";
import Blog from "./pages/blog";
import Account from "./pages/account";
import CreateBlog from "./pages/create-blog";
import MyBlog from "./pages/my-blogs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Blog />} />
      <Route path="/account" element={<Account />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/create-blog/:id" element={<CreateBlog />} />
      <Route path="/my-blogs" element={<MyBlog />} />
    </Routes>
  </BrowserRouter>
);
