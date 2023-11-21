import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import api from "../ServerLink/ServerLink";
import axios from "../Axios/Axios";

const AllTheme = () => {
  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text, record) => (
        <img
          src={`${api}${record.thumbnail}`}
          alt={record.title}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "titel",
      key: "titel",
      render: (text, record) => (
        <a href={`${api}${record.links}`}>{record.titel}</a>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record._id)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const [themes, setThemes] = useState([]);

  const getThemes = async () => {
    try {
      const response = await axios.get("/api/themes/getThemes");
      setThemes(response.data.reverse());
    } catch (error) {
      console.error("Error fetching themes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("/api/themes/delete", { id });
      if (response.status === 200) {
        // Delete was successful, update the themes list
        getThemes();
      } else {
        console.error("Error deleting theme:", response.data);
      }
    } catch (error) {
      console.error("Error deleting theme:", error);
    }
  };

  useEffect(() => {
    getThemes();
  }, []); // Only fetch themes once when the component mounts

  return (
    <div>
      <Table columns={columns} dataSource={themes} />
    </div>
  );
};

export default AllTheme;
