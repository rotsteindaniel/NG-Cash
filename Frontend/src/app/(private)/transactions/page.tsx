"use client";
import { Button, Card, DatePicker, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
interface DataType {
  key: React.Key;
  type: string;
  value: number;
  createdAt: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    filters: [
      {
        text: "cash in",
        value: "cash in",
      },
      {
        text: "cash out",
        value: "cash out",
      },
    ],
    onFilter: (value, record) => record.type.indexOf(String(value)) === 0,
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

export default function TransactionsPage() {
  const Router = useRouter();

  const { user, isAuthenticated, seeUserAccountTransactions } =
    useContext(AuthContext);
  const [transactions, setTransactions] = useState<DataType[]>([]);

  const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value ?? 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { "nextauth.token": token } = parseCookies();
        if (!isAuthenticated && !token) {
          message.warning("You need to be logged in to access this page");
          Router.replace("/");
        } else {
          const response = await seeUserAccountTransactions();
          if (response) {
            const response = await seeUserAccountTransactions();

            const formattedTransactions = response.enrichedTransactions.map(
              (transaction: any) => ({
                ...transaction,
                createdAt: transaction.createdAt,
                value: formatCurrency(transaction.value),
              })
            );

            setTransactions(formattedTransactions);
          }
        }
      } catch (error) {
        message.error("Error while retrieving transactions");
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  return (
    <Card>
      <Button type="primary" size="large">
        <Link href="/mainpage">Go to main page!</Link>
      </Button>
      <Table
        title={() => "All Transactions"}
        dataSource={transactions}
        columns={columns}
        size="large"
      />
    </Card>
  );
}
