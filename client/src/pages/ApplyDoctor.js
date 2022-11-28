import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { showLoading, hideLoading } from ".././redux/alertsSlice";
import DoctorForm from "../components/DoctorForm";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const onFinsh = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Somwthing Went failed");
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Apply Doctor</h1>
      <hr />
      <p>Personal Information</p>
      <Form layout="vertical" onFinish={onFinsh}>
        <Row gutter={20}>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="First Name" name="firstName">
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Last Name" name="lastName">
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input placeholder="Website" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Address" name="address">
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <p>Professional Information</p>
        <Row gutter={20}>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Specified In" name="specifiedIn">
              <Input placeholder="Specified In" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Experience" name="experience">
              <Input placeholder="Experience" />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Fee per Consultation" name="feePerConsultation">
              <Input placeholder="Fee per Consultation" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} lg={8}>
            <Form.Item label="Timing" name="timings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex">
          <Button className="form-submit" type="primary" htmlType="submit">
            SUBMIT
          </Button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyDoctor;
