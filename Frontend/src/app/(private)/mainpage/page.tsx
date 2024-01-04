"use client";
import Link from "next/link";
import styles from "./page.module.css";

export default function MainPage() {
  return (
    <main className={styles.main}>
      <div>oi usuario daniel</div>
      <div>Balance: 100</div>
      <Link href="/mainpage">Ir para todas as transações</Link>
      <Link href="/mainpage">Realizar uma transação</Link>
    </main>
  );
}
