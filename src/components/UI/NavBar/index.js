import { useNavigate } from "react-router-dom";
import { AUTH, USER } from "../../../Utility/variable";
import { useNotification } from "../../../hooks/useNotification";
import { Button } from "antd";

const NavBar = () => {
  let navigate = useNavigate();
  const getAuthToken = localStorage.getItem(AUTH);
  const { contextHolder } = useNotification();
  const localData = localStorage.getItem(USER);
  const getUserData = JSON.parse(localData);
  return (
    <div className="bg-white text-black px-8 py-3 shadow-md sticky top-0 z-20">
      {contextHolder}
      <div className=" grid grid-cols-2 justify-between items-center gap-4">
        <div>
          <span className="px-4 py-2 italic rounded-full text-xl font-normal font-mono text-blue-500">
            BLOG-POST{" "}
            <span className="text-[12px] text-green-500 relative top-2 right-2">
              Hi {getUserData?.userName}{" "}
            </span>
          </span>
        </div>
        <div className="flex justify-end">
          {getAuthToken ? (
            <div className="flex gap-10 items-center">
              <a href="/" className=" cursor-pointer hover:text-blue-600">
                All blogs
              </a>
              <a
                href="/my-blogs"
                className=" cursor-pointer hover:text-blue-600"
              >
                My blogs
              </a>

              <a
                href="/create-blog"
                className=" cursor-pointer hover:text-blue-600"
              >
                Post blog
              </a>
              <a
                href="/"
                onClick={() => localStorage.clear()}
                className="text-sm cursor-pointer px-4 py-1 rounded-md bg-red-500 text-white"
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="flex gap-10 items-center">
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-700 text-white px-5 py-2 text-sm font-medium rounded-md"
              >
                Post Blog
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-700 text-white px-5 py-2 text-sm font-medium rounded-md"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-blue-700 text-white px-5 py-2 text-sm font-medium rounded-md"
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export { NavBar };
