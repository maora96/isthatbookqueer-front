import styles from "./styles.module.scss";
import { Divider } from "antd";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { useEffect, useState } from "react";
import { supabase } from "../../api";
import { Book } from "../../types";
import { DataTable } from "../../components/DataTable";

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <h1>Heya from admin!</h1>

        <Divider />
      </div>
    </div>
  );
}
