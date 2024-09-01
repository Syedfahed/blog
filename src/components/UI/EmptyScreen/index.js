import React from "react";
import { Empty } from "antd";

const EmptyScreen = () => (
  <div
    className="flex flex-col justify-center items-center mt-20"
  >
    <Empty description="No Data Available" />
    <p style={{ marginTop: "20px", fontSize: "16px" }}>
      Please connect with the admin for more information.
    </p>
    <p style={{ fontSize: "16px" }}>
      Email: <a href="mailto:syedfahed21@gmail.com">syedfahed21@gmail.com</a>
    </p>
  </div>
);

export { EmptyScreen };
