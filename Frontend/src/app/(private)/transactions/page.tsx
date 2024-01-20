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
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    // onFilter: (value, record) => record.type.indexOf(value) === 0,
    onFilter: (value, record) => record.type.indexOf(String(value)) === 0,
    // sorter: (a, b) => a.type.length - b.type.length,
    // sortDirections: ["descend", "ascend"],
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
    // sorter: (a, b) =>
    // new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    // sorter: (a, b) => a.type.length - b.type.length,
    // sortDirections: ["descend", "ascend"],
  },
];

// const onChange: TableProps<DataType>["onChange"] = (
//   pagination,
//   filters,
//   sorter,
//   extra
// ) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

export default function TransactionsPage() {
  const Router = useRouter();

  const { user, logOut, isAuthenticated, seeUserAccountTransactions } =
    useContext(AuthContext);
  const [transactions, setTransactions] = useState<DataType[]>([]);

  // Função para formatar o valor em reais
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
          message.warning("Você precisa estar logado para acessar esta página");
          Router.replace("/");
        } else {
          const response = await seeUserAccountTransactions();
          if (response) {
            // Filtrar por tipo e formatar a data e valores
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
        console.error("Erro ao buscar transações:", error);
        // Adicione o tratamento de erro necessário aqui, como exibir uma mensagem de erro para o usuário
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

  return (
    // <main className={styles.main}>
    <Card>
      <Button type="primary" size="large">
        <Link href="/mainpage">Go to main page!</Link>
      </Button>
      <Table
        title={() => "All Transactions"}
        dataSource={transactions}
        columns={columns}
        // onChange={onChange}
        size="large"
      />
    </Card>
    // </main>
  );
}
