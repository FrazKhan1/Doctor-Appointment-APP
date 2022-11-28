import React, { useEffect, useState } from "react";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Table } from "antd";

function Doctorlist() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-status",
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorData();
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error updating");
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div
              className="cursor"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </div>
          )}
          {record.status === "approved" && (
            <div
              className="cursor"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="title-text">User List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default Doctorlist;
