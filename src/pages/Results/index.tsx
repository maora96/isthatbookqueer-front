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
  Spin,
} from "antd";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { supabase } from "../../api";
import { useQuery } from "../../hooks/query";
import { useEffect, useState } from "react";
import { Book } from "../../types";
import CardsContainer from "../../components/CardsContainer";

export default function Results() {
  const query = useQuery();
  const [results, setResults] = useState<Book[]>([]);

  const getResults = async (search: string) => {
    const { data, error } = await supabase
      .from("books")
      .select()
      .ilike("title", `%${search}%`)
      .eq("approved", false);

    console.log("result:", data, error);
    if (data) {
      setResults(data);
    }
  };
  useEffect(() => {
    const search = query.get("search");
    if (search) getResults(search);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <h1>You searched for: {query.get("search")}</h1>

        {results?.length === 0 ? (
          <div className={styles.spin}>
            <h2>No book found :(</h2>
            <p>
              If you know more about this book, please consider suggesting it by
              clicking the "Suggest a book" button at the top left corner of the
              page!
            </p>
          </div>
        ) : (
          <CardsContainer books={results} />
        )}
      </div>
    </div>
  );
}
