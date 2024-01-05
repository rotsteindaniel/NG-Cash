"use client";
import { Button, Card, Table, TableProps } from "antd";
import styles from "./page.module.css";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";

interface DataType {
  key: React.Key;
  type: string;
  value: number;
  createdAt: string;
}

const dataSource = [
  {
    key: "1",
    type: "CashIn",
    value: 32,
    createdAt: "2024-01-05T17:53:35.717Z",
  },
  {
    key: "2",
    type: "CashOut",
    value: 42,
    createdAt: "2024-01-07T17:53:35.717Z",
  },
  {
    key: "3",
    type: "CashOut",
    value: 42,
    createdAt: "2024-02-15T17:53:35.717Z",
  },
  {
    key: "4",
    type: "CashIn",
    value: 30,
    createdAt: "2024-10-08T17:53:35.717Z",
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    filters: [
      {
        text: "CashIn",
        value: "CashIn",
      },
      {
        text: "CashOut",
        value: "CashOut",
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
  return (
    // <main className={styles.main}>
    <Card>
      <Button type="primary">
        <Link href="/mainpage">Go to main page!</Link>
      </Button>
      <Table
        title={() => "All Transactions"}
        dataSource={dataSource}
        columns={columns}
        // onChange={onChange}
        size="large"
      />
    </Card>
    // </main>
  );
}
