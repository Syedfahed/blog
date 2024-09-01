import { UserOutlined } from "@ant-design/icons";

const Card = ({ blog, index }) => {
  return (
    <div key={index} className="flex gap-4 bg-white shadow-md rounded-md p-4">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[16px] font-semibold">{blog?.title || "Hi"}</p>
          <p className="text-sm text-gray-400 flex gap-2">
            {" "}
            <UserOutlined className=" text-green-500" />
            {blog?.postBy}
          </p>
        </div>
        <p>{blog.description}</p>
      </div>
    </div>
  );
};
export { Card };
