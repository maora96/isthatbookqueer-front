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

interface ICardsContainer {
  books: Book[];
}

export default function CardsContainer({ books }: ICardsContainer) {
  return (
    <div className={styles["cards-container"]}>
      {books?.map((book: Book) => (
        <BookCard book={book} />
      ))}
    </div>
  );
}
