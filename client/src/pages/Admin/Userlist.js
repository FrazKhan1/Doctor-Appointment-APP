import React, { useEffect, useState } from "react";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";

import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Table } from "antd";

function Userlist() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex">
          <div className="cursor">Block</div>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="title-text">User List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default Userlist;
