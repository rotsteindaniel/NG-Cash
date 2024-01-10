"use client";
import Link from "next/link";
import styles from "./page.module.css";
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
      message.warning("Você precisa estar logado para acessar esta página");
      Router.replace("/");
    }
  }, [isAuthenticated, user]);

  // Função para formatar o valor em reais
  const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value ?? 0);
  };

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
          <Title level={2}>Olá {user?.username}</Title>
        </Flex>
        <Flex vertical align="center">
          <Title level={4}>Balance: {formatCurrency(user?.balance)}</Title>
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
