import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import loginImage from "../images/signin-image.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from ".././redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
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
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginImage} alt="sing up image" />
              </figure>
              <Link to="/register" className="signup-image-link">
                Create an account
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign in</h2>
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Email" name="email">
                  <Input type="email" placeholder="Email" />
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
                    Login
                  </Button>
                </Form.Item>
              </Form>
              {/* <div class="social-login">
                <span class="social-label">Or login with</span>
                <ul class="socials">
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="display-flex-center zmdi zmdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
