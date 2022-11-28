import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import registerImage from "../images/signup-image.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from ".././redux/alertsSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Somwthing Went failed");
    }
  };
  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Name" name="name">
                  <Input placeholder="Name" type="text" />
                </Form.Item>
                <Form.Item label="Email " name="email">
                  <Input placeholder="Email" type="email" />
                </Form.Item>

                <Form.Item label="Password" name="password">
                  <Input placeholder="Password" type="password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="form-submit"
                    type="primary"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={registerImage} alt="sing up image" />
              </figure>
              <Link to="/login" className="signup-image-link">
                I am already member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
