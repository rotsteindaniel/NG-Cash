"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { Button, Card, Flex, Space, Typography, message } from "antd";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function MainPage() {
  const Router = useRouter();

  const { user, setUser, isAuthenticated, recoverUserInformation, logOut } =
    useContext(AuthContext);

  async function fetchUserData() {
    const userData = await recoverUserInformation();
    setUser(userData?.user || null);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/");
      message.error("You are not logged in.");
    } else {
      fetchUserData();
    }
  }, [isAuthenticated]);

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
          <Title level={2}>Olá</Title>
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
