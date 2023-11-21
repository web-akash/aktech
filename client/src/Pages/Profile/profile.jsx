import React, { useEffect, useState } from "react";
import axios from "../../Component/Axios/Axios";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ServerLink from "../../Component/ServerLink/ServerLink";
import { activeUser } from "../../Component/userSlice/UserSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [dataSource, setDataSource] = useState([]);
  const selectore = useSelector((state) => state);
  const email = selectore?.user?.userValue?.data?.email;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(activeUser(null));
    navigate("/");
  };

  useEffect(() => {
    if (selectore.user.userValue?.success !== "Successfully Login") {
      navigate("/login");
    }
  }, []);

  const columns = [
    {
      title: "Package",
      dataIndex: "productInfo",
      key: "productInfo",
    },
    {
      title: "Price",
      dataIndex: "packagePrice",
      key: "packagePrice",
    },
    {
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Payment ",
      dataIndex: "payment",
      key: "payment",
      render: (text, record) => (
        <span>
          {record.payment
            ? "Order Request Successful"
            : "Order Request Unsuccessful"}
        </span>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Delivery Status",
      dataIndex: "status",
      key: "deliveryDate",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.post("/api/order/view", { id: email });
      const ordersData = response.data.data;
      const formattedData = ordersData.map((order, index) => ({
        key: order._id,
        productInfo: order.productInfo,
        packagePrice: order.packagePrice,
        payment: order.payment,
        paidAmount: order.paidAmount,
        paymentStatus:
          +order.paidAmount === +order.packagePrice ? "Paid" : "Due",
        dueAmount: order.dueAmount,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        deliveryDate: order.deliveryDate
          ? new Date(order.deliveryDate).toLocaleDateString()
          : null,
        status: order.status,
        description: (
          <div className="text-sm flex justify-between gap-x-2 text-center items-center">
            <p>
              <span className="font-medium">Product Info: </span>
              {order.productInfo},
            </p>
            <p>
              <span className="font-medium">TransitionId: </span>
              {order.transitionId},
            </p>
            <p>
              <span className="font-medium">Email:</span>
              {order.buyerEmail},
            </p>
            <p>
              <span className="font-medium">Product ID: </span>
              {order.productId},
            </p>
            <p className="text-[#004282] font-medium">
              <a target="_blank" href={`${ServerLink}uploads/${order?.file}`}>
                View Attachment
              </a>
            </p>
          </div>
        ),
      }));
      setDataSource(formattedData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-5 md:px-20 pb-20 bg-[white]">
        <div className="mt-[120px] text-sm">
          <h1 className="">
            Name:{" "}
            <span className="uppercase">
              {selectore?.user?.userValue?.data?.username}{" "}
            </span>
          </h1>
          <h2>Email: {email}</h2>

          {selectore?.user?.userValue?.data?.role == "aklogicAdmin" && (
            <button
              onClick={() => {
                navigate("/aklogicadmin");
              }}
              className="py-2 px-10 mr-10 rounded-md bg-[#004282] transition-all text-white hover:text-[#004282] hover:bg-white mt-2 text-xs  border-transparent border hover:border-[#004282] "
            >
              Admin Panel
            </button>
          )}

          <button
            onClick={handleLogout}
            className="py-2 px-10  rounded-md bg-[#004282] transition-all text-white hover:text-[#004282] hover:bg-white mt-2 text-xs  border-transparent border hover:border-[#004282] "
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="bg-[#F0F2F5]">
        <div className="max-w-screen-2xl mx-auto px-5 md:px-20 pb-20 min-h-[80vh]">
          <h1 className="text-base py-[20px]">My Order List</h1>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => (
                  <p style={{ margin: 0 }}>{record.description}</p>
                ),
              }}
              dataSource={dataSource.reverse()}
              scroll={{ x: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
