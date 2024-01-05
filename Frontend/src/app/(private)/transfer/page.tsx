"use client";
import { Button, Card, Form, Input, Table, TableProps } from "antd";
import styles from "./page.module.css";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";

export default function TransferPage() {
  return (
    <main className={styles.main}>
      <Card title="Transfer money to someone" style={{ width: 300 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item>
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="value" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Transfer
            </Button>{" "}
            <Button type="primary">
              <Link href="/mainpage">Go to main page!</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}
