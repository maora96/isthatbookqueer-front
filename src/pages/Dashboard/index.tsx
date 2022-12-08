import styles from "./styles.module.scss";
import {
  Form,
  Input,
  Select,
  Space,
  Radio,
  Button,
  Alert,
  Divider,
  Collapse,
  Card,
} from "antd";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { useEffect, useState } from "react";
import { supabase } from "../../api";
import { Book } from "../../types";
import { DataTable } from "../../components/DataTable";

export default function Dashboard() {
  const getUser = async () => {
    const user = supabase.auth.user();
    return user?.id;
  };

  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = async () => {
    const { data, error } = await supabase.from("books").select();

    console.log("result:", data, error);
    if (data) {
      setBooks(data);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    console.log(getUser());
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <h1>Heya from admin!</h1>
        {/* <p>
          Have you ever picked up a thriller, sci-fi or fantasy book, got
          interested but was just not in the mood to read more straight/cis/allo
          stuff? So have we!
        </p>
        <SearchForm /> */}

        <Divider />

        <DataTable data={books} columns={} />
      </div>
    </div>
  );
}
