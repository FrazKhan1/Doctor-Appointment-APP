import React from "react";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";

function DoctorForm({ onFinsh, initialValues }) {
  return (
    <Form layout="vertical" onFinish={onFinsh} initialValues={initialValues}>
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
        {/* <Col span={8} xs={24} lg={8}>
          <Form.Item label="Timing" name="timings">
            <TimePicker.RangePicker />
          </Form.Item>
        </Col> */}
      </Row>
      <div className="d-flex">
        <Button className="form-submit" type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
