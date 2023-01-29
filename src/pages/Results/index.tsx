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
  Typography,
} from "antd";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { supabase } from "../../api";
import { useEffect, useState } from "react";
import { Book } from "../../types";
import CardsContainer from "../../components/CardsContainer";
// import { useGetBooks } from "../../hooks/books";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBooksClient } from "../../api/client";

export default function Results() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { Text, Title } = Typography;
  const [form] = Form.useForm();
  const { Search } = Input;

  const [filters, setFilters] = useState<any>({
    amount: 50,
    page: 1,
    since: undefined,
    until: undefined,
    search: searchParams.get("search"),
  });

  const { data, isFetching } = useQuery(
    ["getBooks", filters],
    async () =>
      getBooksClient(
        filters.page,
        filters.amount,
        filters.since,
        filters.until,
        filters.search
      ),
    {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onSuccess: () => navigate(`/results?search=${filters.search}`),
    }
  );

  const onSubmit = async (rawData: any) => {
    if (typeof rawData === "string")
      setFilters({ ...filters, search: rawData });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <div className={styles["form-container"]}>
          <Form
            className={styles.form}
            layout="vertical"
            form={form}
            name="search-book"
            onFinish={onSubmit}
          >
            <Search
              placeholder="Search for a book by title or author"
              onSearch={onSubmit}
              enterButton
            />
          </Form>
        </div>

        <Title level={1}>You searched for: {filters.search}</Title>
        {isFetching ? (
          <div className={styles.result}>
            <Spin size="large" />
          </div>
        ) : (
          <CardsContainer books={data?.data?.result} />
        )}
      </div>
    </div>
  );
}
