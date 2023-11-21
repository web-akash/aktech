import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileImageOutlined,
  ProfileOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Layout, Menu, Button, theme } from "antd";

import { MdWork } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import UploadTheme from "../../Component/Admin/UploadTheme";
import AllTheme from "../../Component/Admin/AllTheme";
import AllOrder from "../../Component/Admin/AllOrder";
import { activeUser } from "../../Component/userSlice/UserSlice";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1"); // Initialize with the default menu item

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (key) => {
    setSelectedMenuItem(key);
  };
  const dishpath = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state);
  useEffect(() => {
    if (selector?.user?.userValue?.data?.role == "aklogicAdmin") {
      return navigate("/aklogicadmin");
    } else {
      return navigate("/profile");
    }
  }, []);

  const handelLogout = () => {
    localStorage.removeItem("user");
    dishpath(activeUser(null));
    navigate("/");
  };

  let content = null;

  switch (selectedMenuItem) {
    case "1":
      content = <AllOrder />;
      break;
    case "2":
      content = <AllTheme />;
      break;
    case "3":
      content = <UploadTheme />;
      break;
    case "4":
      //   content = <JobOffer />;
      break;
    case "5":
      handelLogout();
      break;
    default:
      content = <div>Default Content</div>;
  }

  return (
    <Layout
      className="flex  !flex-col "
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="!w-full !max-w-full md:!max-w-[100%] md:!min-w-[100%] !min-w-full"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="py-[30px] text-center  text-[white] bg-[#F0F2F5] px-5">
          <h2 className="px-5">Weepoka</h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={({ key }) => handleMenuItemClick(key)}
          defaultSelectedKeys={["1"]}
          sx={{ backgroundColor: "red" }}
          items={[
            {
              key: "1",
              icon: <ProfileOutlined />,
              label: " Orders",
            },
            {
              key: "2",
              icon: <ProfileOutlined />,
              label: "All Themes",
            },
            {
              key: "3",
              icon: <ProfileOutlined />,
              label: "Upload Themes",
            },
            // {
            //   key: "4",
            //   icon: <MdWork />,
            //   label: "JobOffer",
            // },
            {
              key: "5",
              icon: <BiLogOut />,
              label: "LogOut",
            },
          ]}
        />
      </Sider>
      <Layout
        className=" md:!w-auto !w-full  "
        style={{
          minHeight: "100vh",
        }}
      >
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ></Header> */}

        <Content
          className=" !m-0 md:!p-6 md:!m-6  !p-4 "
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowX: "scroll !important",
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
