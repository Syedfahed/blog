import React, { useEffect, useState } from "react";
import { Card, EmptyScreen, NavBar } from "../components";
import { getMethod } from "../Utility/http-services";
import { Skeleton } from "antd";
const sampleData = [
  {
    _id: "66d3f5e36914d9bed375dbfc",
    userEmail: "syedfahed21@gmail.com",
    postBy: "Syed Fahed",
    title: "Full-Stack Developer",
    description:
      "As a Full-Stack Developer, I am responsible for developing and maintaining the backend of a shopping website using Node.js and MySQL. My role involves designing and implementing RESTful APIs, managing database schemas, and ensuring efficient data retrieval and storage. I collaborate closely with the front-end team to integrate the user interface with backend services seamlessly. Additionally, I am involved in optimizing the application's performance, addressing security vulnerabilities, and ensuring scalability. My work also includes writing unit tests, debugging issues, and deploying updates to production environments. I actively participate in code reviews, provide technical guidance to junior developers, and contribute to continuous integration and deployment processes. The project aims to provide users with a smooth and secure online shopping experience.\n",
    postDate: "31-08-2024",
    userID: "66d3f5a06914d9bed375dbf8",
    __v: 0,
  },
  {
    _id: "66d408d441297bc3fe1bc448",
    userEmail: "syedfahed21@gmail.com",
    postBy: "Rahul",
    title: "Front-End Developer",
    description:
      "In my role as a Front-End Developer, I focus on building responsive and visually appealing landing pages using Next.js and Tailwind CSS. My responsibilities include translating design mockups into interactive and functional web pages that are optimized for performance and accessibility. I work closely with designers to ensure that the user interface is both aesthetically pleasing and user-friendly. My tasks also involve implementing client-side logic, handling asynchronous data fetching, and integrating third-party APIs. I regularly conduct cross-browser testing and mobile responsiveness checks to ensure consistent user experiences across different devices. Additionally, I contribute to improving the website's SEO by optimizing HTML structure and implementing meta tags. My goal is to deliver a seamless and engaging user experience that meets the project's requirements.",
    postDate: "31-08-2024",
    userID: "66d3f5a06914d9bed375dbf8",
    __v: 0,
  },
  {
    _id: "66d4093e41297bc3fe1bc44a",
    userEmail: "syedfahed21@gmail.com",
    postBy: "RJ",
    title: "UI/UX Designer",
    description:
      "As a UI/UX Designer, my primary responsibility is to design intuitive and visually appealing user interfaces for mobile applications. My process involves conducting user research to understand the target audience's needs, creating wireframes and prototypes, and collaborating with developers to ensure the final product aligns with the design vision. I focus on creating user-centric designs that enhance the overall user experience, making the application easy to navigate and interact with. My work also includes conducting usability testing to gather feedback and iterating on designs based on user input. I stay updated on the latest design trends and best practices, ensuring that the application remains modern and competitive. Additionally, I am involved in creating design guidelines and documentation to maintain consistency across the project. My goal is to create a user interface that is both functional and aesthetically pleasing.",
    postDate: "31-08-2024",
    userID: "66d3f5a06914d9bed375dbf8",
    __v: 0,
  },
  {
    _id: "66d4096841297bc3fe1bc44c",
    userEmail: "syedfahed21@gmail.com",
    postBy: "Syed Fahed",
    title: "Backend Developer",
    description:
      "In my role as a Backend Developer, I am responsible for implementing RESTful APIs using Node.js and Express. My work involves designing database schemas, writing server-side logic, and ensuring that the backend services are scalable, secure, and efficient. I collaborate with front-end developers to integrate the backend with the user interface, ensuring that data is transmitted and processed correctly. My tasks also include optimizing queries for performance, handling authentication and authorization, and managing session states. I am involved in deploying the backend services to cloud platforms, monitoring their performance, and addressing any issues that arise in production. Additionally, I participate in code reviews, contribute to the continuous integration pipeline, and document the backend architecture and APIs. My goal is to deliver robust and reliable backend services that power the application's core functionalities.",
    postDate: "31-08-2024",
    userID: "66d3f5a06914d9bed375dbf8",
    __v: 0,
  },
];
export default function Blog() {
  const [blogs, setBlogs] = useState(sampleData);
  const [isLoading, setLoading] = useState(true);
  const getBlogs = async () => {
    setLoading(true);
    try {
      const request = {
        endpoint: "api/blogs",
      };
      const { data } = await getMethod(request);
      setBlogs(data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);

  return (
    <>
      <NavBar />
      <div className="xl:p-20 lg:p-20 md:p-10 p-5 bg-slate-200">
        {isLoading ? (
          <div>
            <Skeleton active />
            <p className="text-center text-xl font-bold m-4">Place wait server is starting</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10 ">
            {blogs.length > 0 ? (
              <>
                {blogs.map((blog, index) => {
                  return <Card blog={blog} index={index} />;
                })}
              </>
            ) : (
              <EmptyScreen />
            )}
          </div>
        )}
      </div>
    </>
  );
}
