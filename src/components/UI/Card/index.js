import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Card = ({ blog }) => {
  return (
    <a href={`/blog/${blog.slug}`} className="flex gap-4 hover:scale-95 transition-all duration-500 bg-white shadow-sm hover:shadow-xl rounded-md p-4 cursor-pointer">
      <div className="flex flex-col gap-4 truncate	">
        <div>
          <img src={blog.image || '/images/blog.jpg'} alt='banner' className=" flex justify-center w-full h-[200px] object-cover"/>
          <p className="text-[16px] font-semibold text-wrap mb-2 mt-8">{blog?.title || "Hi"}</p>
          <p className="text-sm text-gray-400 flex gap-2">
            {" "}
            <UserOutlined className=" text-green-500" />
            {blog?.postBy}
          </p>
        </div>
        <div className="text-wrap h-[100px]" dangerouslySetInnerHTML={{__html:blog.description}}></div>
        <Button className="bg-black text-white my-4">
          Read More
        </Button>
      </div>
    </a>
  );
};
export { Card };
