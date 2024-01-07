"use client";
import { AuthContext } from "@/contexts/AuthContext";
import styles from "./page.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, message } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const validatePassword = (_: any, value: string) => {
  // Use uma expressão regular para verificar a presença de pelo menos 8 caracteres,
  // um número e uma letra maiúscula.
  const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

  if (!passwordRegex.test(value)) {
    return Promise.reject(
      "Password must be at least 8 characters long, contain a number, and an uppercase letter!"
    );
  }

  return Promise.resolve();
};

export default function Register() {
  const router = useRouter();

  const { registerUser } = useContext(AuthContext);

  const onFinish = async ({ username, password }: any) => {
    try {
      await registerUser({ username, password });
      router.replace("/");
    } catch (error) {
      message.error(error.response.data.message);
      router.replace("/");
    }
  };

  return (
    <Card title="Register" style={{ width: 300 }}>
      <Form
        name="normal_register"
        className="register-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your Username!" },
            { min: 3, message: "Username must be at least 3 characters long!" },
            {
              max: 20,
              message: "Username must be less than 20 characters long!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { validator: validatePassword },
          ]}
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
    </Card>
  );
}
