import { Tabs } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from ".././redux/alertsSlice";
import { setUser } from "../redux/userSlice";

function Notifications() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAllasSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notifications-seen",
        { usesrId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong", error);
    }
  };

  const deleteAll = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notifications",
        { usesrId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong", error);
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key="item-1">
          <div className="d-flex justify-content-end">
            <p className="link-primary cursor" onClick={() => markAllasSeen()}>
              Mark all as read
            </p>
          </div>

          {user?.unseenNotifications.map((n) => {
            return (
              <div
                className="card p-2 m-2 cursor"
                onClick={() => navigate(n.onClickPath)}
              >
                <div className="card-text ">{n.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key="item-2">
          <div className="d-flex justify-content-end">
            <p className="link-danger cursor" onClick={() => deleteAll()}>
              Delete all
            </p>
          </div>
          {user?.seenNotifications.map((n) => {
            return (
              <div
                className="card p-2 m-2 cursor"
                onClick={() => navigate(n.onClickPath)}
              >
                <div className="card-text ">{n.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
