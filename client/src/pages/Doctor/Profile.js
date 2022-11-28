import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/DoctorForm";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctor] = useState(null);
  const onFinsh = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
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
  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      <h1>Doctors Profile</h1>
      <hr />
      {doctors && (
        <Form
          layout="vertical"
          onFinish={onFinsh}
          initialValues={{
            ...doctors,
            timings: [
              moment(doctors.timings[0], "HH:mm"),
              moment(doctors.timings[1], "HH:mm"),
            ],
          }}
        >
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
      )}
    </Layout>
  );
}

export default Profile;
