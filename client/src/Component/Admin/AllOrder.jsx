import React, { useEffect, useState } from "react";
import { Table, Button, Select, Input } from "antd";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import ServerLink from "../ServerLink/ServerLink";

const { Option } = Select;

const AllOrder = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "buyerName",
      key: "buyerName",
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
      render: (text, record) => (
        <Input
          type="number"
          className="w-[100px]"
          value={record.dueAmount}
          onChange={(e) => handleDueAmountChange(record.key, e.target.value)}
        />
      ),
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (text, record) => (
        <Input
          type="number"
          className="w-[100px]"
          value={record.paidAmount}
          onChange={(e) => handlePaidAmountChange(record.key, e.target.value)}
        />
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text, record) => <span>{record.paymentStatus}</span>,
    },
    {
      title: "Order Status",
      dataIndex: "payment",
      key: "payment",
      render: (text, record) => (
        <span>{record.payment ? "Successful" : "Unsuccessful"}</span>
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
      render: (text, record) => (
        <input
          type="date"
          value={record.deliveryDate}
          onChange={(e) => handleDeliveryDateChange(record.key, e.target.value)}
        />
      ),
    },
    {
      title: "Delivery Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={record.status}
          style={{ width: 150 }}
          onChange={(value) => handleStatusChange(record.key, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Developing">Developing</Option>
          <Option value="Correction">Correction</Option>
          <Option value="Bug Fixing">Bug Fixing</Option>
          <Option value="Updating">Updating</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <button
          onClick={() =>
            handleSend(
              record.key,
              record.deliveryDate,
              record.status,
              record.paidAmount,
              record.dueAmount
            )
          }
          className="py-2 px-10  rounded-md bg-[#004282] transition-all text-white hover:text-[#004282] hover:bg-white mt-2 text-xs  border-transparent border hover:border-[#004282] "
        >
          Update
        </button>
      ),
    },
  ];

  const handleDeliveryDateChange = (key, newDate) => {
    // Update the delivery date in the dataSource
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === key) {
        return { ...record, deliveryDate: newDate };
      }
      return record;
    });

    setDataSource(updatedDataSource);
  };

  const handleDueAmountChange = (key, newAmount) => {
    // Update the dueAmount in the dataSource
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === key) {
        return { ...record, dueAmount: newAmount };
      }
      return record;
    });

    setDataSource(updatedDataSource);
  };

  const handlePaidAmountChange = (key, newAmount) => {
    // Update the paidAmount and paymentStatus in the dataSource
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === key) {
        const packagePrice = record.packagePrice || 0;
        const updatedRecord = {
          ...record,
          paidAmount: newAmount,
          paymentStatus: +newAmount === +packagePrice ? "Paid" : "Due",
        };
        return updatedRecord;
      }
      return record;
    });

    setDataSource(updatedDataSource);
  };

  const handleStatusChange = (key, newStatus) => {
    // Update the delivery status in the dataSource
    const updatedDataSource = dataSource.map((record) => {
      if (record.key === key) {
        return { ...record, status: newStatus };
      }
      return record;
    });

    setDataSource(updatedDataSource);
  };

  const handleSend = async (
    key,
    deliveryDate,
    status,
    paidAmount,
    dueAmount
  ) => {
    try {
      setLoading(true);
      await axios.post(`/api/admin/order-update/${key}`, {
        deliveryDate,
        status,
        paidAmount,
        dueAmount,
      });
      setLoading(false);
      // Optionally, you can display a success message or update the data again
      // to reflect any changes made on the server.
      toast.success("Successfully Updated", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Due Payment", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch order data from the backend API
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/order");
        const ordersData = response.data.data;

        // Prepare the data for the table
        const formattedData = ordersData.reverse().map((order, index) => ({
          key: order._id, // Use the order ID as the key
          buyerName: order.buyerName,
          packagePrice: order.packagePrice,
          dueAmount: order.dueAmount,
          paidAmount: order.paidAmount,
          paymentStatus:
            +order.paidAmount === +order.packagePrice ? "Paid" : "Due",
          payment: order.payment,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          deliveryDate: order.deliveryDate
            ? order.deliveryDate
            : new Date(order.deliveryDate).toLocaleDateString(),
          status: order.status,
          description: (
            <div className="text-sm flex justify-between gap-x-2 text-center items-center">
              <p>
                <span className="font-medium">Product Info:</span>
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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ overflowX: "auto" }}>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataSource}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
            }}
            scroll={{ x: "100%" }} // Enable horizontal scrolling
          />
        </div>
      </div>
    </>
  );
};

export default AllOrder;
