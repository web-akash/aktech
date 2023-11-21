import React, { useEffect, useState } from "react";
import { Table, Button, Select, Input, Popconfirm } from "antd";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import ServerLink from "../ServerLink/ServerLink";

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;

  switch (inputType) {
    case "number":
      inputNode = <Input type="number" />;
      break;
    default:
      inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <form>
          {dataIndex === "dueAmount" || dataIndex === "paidAmount" ? (
            <Popconfirm
              title="Sure to update?"
              onConfirm={() =>
                restProps.onUpdate(record.key, dataIndex, inputNode.props.value)
              }
            >
              {inputNode}
            </Popconfirm>
          ) : (
            <Input
              ref={(node) => {
                inputNode = node;
              }}
              onPressEnter={() =>
                restProps.onUpdate(record.key, dataIndex, inputNode.props.value)
              }
              onBlur={() =>
                restProps.onUpdate(record.key, dataIndex, inputNode.props.value)
              }
            />
          )}
        </form>
      ) : (
        children
      )}
    </td>
  );
};

const AllOrder = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const handleUpdate = (key, dataIndex, value) => {
    const newData = [...dataSource];
    const target = newData.find((item) => key === item.key);
    if (target) {
      target[dataIndex] = value;
      setDataSource(newData);
      setEditingKey("");
    }
  };

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
      editable: true,
    },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      editable: true,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
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
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm
              title="Sure to update?"
              onConfirm={() =>
                handleUpdate(record.key, "dueAmount", record.dueAmount)
              }
            >
              <Button type="link" size="small">
                Save
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => setEditingKey("")}
            >
              <Button type="link" size="small">
                Cancel
              </Button>
            </Popconfirm>
          </span>
        ) : (
          <Button
            type="link"
            size="small"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
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
          paymentStatus: order.paymentStatus,
          payment: order.payment,
          orderDate: new Date(order.orderDate).toLocaleDateString(),
          deliveryDate: order.deliveryDate
            ? order.deliveryDate
            : new Date(order.deliveryDate).toLocaleDateString(),
          status: order.status,
          description: (
            <p className="text-sm font-medium">
              Product Info:{order.productInfo}, Product ID: {order.productId},
              TransitionId: {order.transitionId}, Email:{order.buyerEmail},{""}
              <a target="_blank" href={`${ServerLink}uploads/${order?.file}`}>
                View Attachment
              </a>
            </p>
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
            scroll={{ x: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default AllOrder;
