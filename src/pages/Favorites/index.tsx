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

export default function Favorites() {
  const query = useQuery();
  const [favorites, setFavorites] = useState<Book[]>([]);

  const getFavorites = async (favs: number[]) => {
    const { data, error } = await supabase
      .from("books")
      .select()
      .in("id", favs)
      .eq("approved", false);

    console.log("result:", data, error);
    if (data) {
      setFavorites(data);
    }
  };

  useEffect(() => {
    const favoritesStored = localStorage.getItem("favorites");

    if (favoritesStored !== null && favoritesStored !== undefined) {
      const parsedFavorites = JSON.parse(favoritesStored);
      if (parsedFavorites) getFavorites(parsedFavorites);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <h1>Your favorite books:</h1>

        {favorites?.length === 0 ? (
          <div className={styles.spin}>
            <h2>No book found :(</h2>
            <p>
              You can favorite a book by going to its page and clicking the
              heart icon!
            </p>
          </div>
        ) : (
          <CardsContainer books={favorites} />
        )}
      </div>
    </div>
  );
}
