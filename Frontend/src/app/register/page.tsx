"use client";
import styles from "./page.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import Link from "next/link";

export default function Register() {
  return (
    <main className={styles.main}>
      <Form
        name="normal_login"
        // className="login-form"
        className={styles.registerForm}
        initialValues={{ remember: true }}
      >
        <h1 className={styles.title}>Register</h1>

        <Space> </Space>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
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
            Register
          </Button>{" "}
          Or <Link href="/">go to login page!</Link>
        </Form.Item>
      </Form>
    </main>
  );
}
