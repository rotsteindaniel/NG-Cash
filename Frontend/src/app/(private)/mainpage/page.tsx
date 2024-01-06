"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { Button, Card, Flex, Space, Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const { Title } = Typography;

export default function MainPage() {
  const { logOut } = useContext(AuthContext);

  return (
    // <main className={styles.main}>
    <Card title="Main Page" style={{ width: 500 }}>
      <Flex vertical align="center">
        <Button type="primary" size="large" onClick={logOut}>
          {/* <Link href="/" onClick={logOut}> */}
          Log Out
          {/* </Link> */}
        </Button>
        <Flex vertical align="center">
          <Title level={2}>Oi user Daniel</Title>
        </Flex>
        <Flex vertical align="center">
          <Title level={4}>Balance: R$ 100,00</Title>
        </Flex>
        <Space size="small">
          <Button type="primary" size="large">
            <Link href="/transactions">Ir para todas as transações</Link>
          </Button>
          <Button type="primary" size="large">
            <Link href="/transfer">Realizar uma transação</Link>
          </Button>
        </Space>
      </Flex>
    </Card>
    // </main>
  );
}
