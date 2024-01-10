"use client";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Table,
  TableProps,
  message,
} from "antd";
import styles from "./page.module.css";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function TransferPage() {
  const router = useRouter();

  const { transferMoneyUsingUsername } = useContext(AuthContext);

  type transferData = {
    targetUsername: string;
    value: number;
  };

  const onFinish = async ({ targetUsername, value }: transferData) => {
    const amount = value.toString();

    try {
      await transferMoneyUsingUsername({ targetUsername, amount });
      // message.success(error.response.data.message);
      router.push("/mainpage");
    } catch (error) {
      console.log(error);
      console.log(error);
      message.error(error.response.data.message);
      // router.replace("/");
    }
  };

  return (
    <Card title="Transfer money to someone" style={{ width: 300 }}>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="targetUsername"
          rules={[{ required: true, message: "Please input the Username!" }]}
        >
          <Input placeholder="send to some username" />
        </Form.Item>
        <Form.Item
          name="value"
          rules={[
            {
              required: true,
              message:
                "Please input an amount! Using comma as decimal separator.",
            },
          ]}
        >
          <InputNumber
            prefix="R$"
            style={{ width: "100%" }}
            step="0.01"
            placeholder="0,00"
            decimalSeparator=","
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Transfer
          </Button>{" "}
          <Button type="primary" size="large">
            <Link href="/mainpage">Go to main page!</Link>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
