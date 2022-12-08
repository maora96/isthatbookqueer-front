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
  Tooltip,
  Tag,
} from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartTwoTone,
} from "@ant-design/icons";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { supabase } from "../../api";
import { useQuery } from "../../hooks/query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../../types";
import Favorite from "../../components/Favorite";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book>();

  const getBook = async (id: number) => {
    const { data, error } = await supabase
      .from("books")
      .select()
      .eq("id", id)
      .eq("approved", false)
      .limit(1);

    console.log("result:", data, error);
    if (data) {
      setBook(data[0]);
    }
  };
  useEffect(() => {
    const actualId = Number(id);
    if (actualId) getBook(actualId);
  }, []);

  if (book === undefined) return <h2>Loading...</h2>;
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <div className={styles["book-container"]}>
          <div className={styles["card-extras"]}>
            <img src={book.cover} alt={book.title} />
            <div className={styles.links}>Goodreads | Storygraph | Amazon</div>
          </div>
          <div className={styles["card-content"]}>
            <div className={styles["card-header"]}>
              <div className={styles.left}>
                <h2>{book.title}</h2>
                <h5>by {book.author}</h5>
                {book?.series ? <h5>{book.series}</h5> : null}
              </div>
              <div className={styles.right}>
                {book.is_queer ? (
                  <Tooltip title="Book is queer!">
                    <CheckCircleTwoTone
                      twoToneColor="#52c41a"
                      className={styles.icon}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Book isn't queer">
                    <CloseCircleTwoTone
                      twoToneColor="red"
                      className={styles.icon}
                    />
                  </Tooltip>
                )}
                <Favorite id={book.id} />
              </div>
            </div>
            <Divider />
            <div className={styles.description}>
              <div className={styles.genres}>
                {book.genres?.map((gen: string) => (
                  <Tag color="cyan">{gen}</Tag>
                ))}
              </div>
              {book.description.split("\n")?.map((paragraph: string) => (
                <p>{paragraph}</p>
              ))}

              {book.is_queer ? (
                <>
                  <h3>How is it queer?</h3>
                  {book.queer_data}
                </>
              ) : (
                <>
                  <h3>Book isn't queer.</h3> Are we wrong? Please let us know
                  through Twitter!
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
