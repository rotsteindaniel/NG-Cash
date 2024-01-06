"use client";
import styles from "./page.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, FormInstance, Input, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

type FieldType = {
  username?: string;
  password?: string;
};

export default function Home() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    message.success("Login success!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Login failed!");
  };

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>{" "}
          Or <Link href="/register">register now!</Link>
        </Form.Item>
      </Form>
    </Card>
  );
}
