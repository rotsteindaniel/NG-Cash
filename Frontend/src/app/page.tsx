"use client";
import styles from "./page.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Form
        name="normal_login"
        // className="login-form"
        className={styles.loginForm}
        initialValues={{ remember: true }}
      >
        <h1 className={styles.title}>Login</h1> <br />
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
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
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
          <br />
          <br />
          Or <Link href="/register">register now!</Link>
        </Form.Item>
      </Form>
    </main>
  );
}
