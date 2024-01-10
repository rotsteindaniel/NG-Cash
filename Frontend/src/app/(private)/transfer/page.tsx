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
  // const router = useRouter();

  const { transferMoneyUsingUsername } = useContext(AuthContext);

  type transferData = {
    targetUsername: string;
    value: string;
  };

  const onFinish = async ({ targetUsername, value }: transferData) => {
    try {
      const amount = formatCurrency(value);

      await transferMoneyUsingUsername({ targetUsername, amount });
      // router.replace("/");
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
      // router.replace("/");
    }
  };

  const formatCurrency = (value: string) => {
    // Convert the value to a number (in case it's a string)
    const numericValue = parseFloat(value);

    // Format the numeric value as currency (BRL)
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);

    return formattedValue;
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
            { required: true, message: "Please input value!" },
            {
              type: "string",
              pattern: /^(\d+(\.\d{1,2})?)$/,
              message:
                "Please enter a valid numeric value. Using dot as decimal separator.",
            },
          ]}
        >
          <Input placeholder="value" />
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
