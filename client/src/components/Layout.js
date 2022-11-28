import React, { useState } from "react";
import userMenu from "./menu";
import AdminMenu from "./AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapes, setcollapes] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const doctorMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "ri-compasses-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-clapperboard-line",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-profile-line",
    },
  ];
  const menuLinks = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <div className="main d-flex">
      <div className={`${collapes ? "collapessideBar" : "sidebar"}`}>
        <h1>SH</h1>
        {menuLinks.map((menu, key) => {
          return (
            <div className="main-upar">
              <div className="main-links">
                <i className={menu.icon}></i>
                {!collapes && (
                  <Link className="Links" to={menu.path}>
                    {menu.name}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        <div className="main-upar">
          <div
            className="main-links"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <i className="ri-logout-circle-line"></i>
            {!collapes && (
              <Link className="Links" to="/login">
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="header-main">
          {collapes ? (
            <i
              className=" ri-menu-2-line remix-icons"
              onClick={() => setcollapes(false)}
            ></i>
          ) : (
            <i
              className="ri-close-fill remix-icons"
              onClick={() => setcollapes(true)}
            ></i>
          )}
          <div className="d-flex align-items-center px-3">
            <Badge
              count={user?.unseenNotifications.length}
              onClick={() => navigate("/notifications")}
            >
              <i className="ri-notification-line px-2 cursor"></i>
            </Badge>
            <Link to="/profile">{user?.name}</Link>
          </div>
        </div>
        <div className="main-container ">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
