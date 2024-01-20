"use client";
import Link from "next/link";
import { Button, Card, Flex, Space, Typography, message } from "antd";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

const { Title } = Typography;

export default function MainPage() {
  const Router = useRouter();

  const { user, recoverUserInformation, logOut, isAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    recoverUserInformation();

    if (!isAuthenticated && !token) {
      message.warning("You need to be logged in to access this page.");
      Router.replace("/");
    }
  }, [isAuthenticated, user]);

  const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value ?? 0);
  };

  return (
    <Card title="Main Page" style={{ width: 500 }}>
      <Flex vertical align="center">
        <Button type="primary" size="large" onClick={logOut}>
          Log Out
        </Button>
        <Flex vertical align="center">
          <Title level={2}>Hello {user?.username}</Title>
        </Flex>
        <Flex vertical align="center">
          <Title level={4}>Balance: {formatCurrency(user?.balance)}</Title>
        </Flex>
        <Space size="small">
          <Button type="primary" size="large">
            <Link href="/transactions">Go to all transactions</Link>
          </Button>
          <Button type="primary" size="large">
            <Link href="/transfer">Make a transaction</Link>
          </Button>
        </Space>
      </Flex>
    </Card>
  );
}
