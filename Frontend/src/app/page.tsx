"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
};

export default function Home() {
  const router = useRouter();

  const { signIn } = useContext(AuthContext);

  const onFinish = async ({ username, password }: any) => {
    try {
      await signIn({ username, password });
      router.replace("/mainpage");
    } catch (error: any) {
      message.error(error.response.data.message);
      router.replace("/");
    }
  };

  return (
    <Card title="Login" style={{ width: 300 }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
