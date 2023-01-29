import styles from "./styles.module.scss";
import { Button, Alert, Divider, Typography } from "antd";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { useGetRandomBook } from "../../hooks/books";

export default function Home() {
  const { Text, Title } = Typography;

  const { data, refetch, isFetching } = useGetRandomBook();
  const description = (
    <Text>
      This website, for practical reasons, defines queer books as books where{" "}
      <strong>one or more main/lead characters are queer</strong>, that is, are
      identified by the author or readers as belonging to the queer community.{" "}
      <em>And</em> by main/lead characters we are speaking of characters who
      either <strong>are POV characters or are important to the story</strong>.
    </Text>
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <Title level={1}>Search for a book!</Title>
        <Text>
          Have you ever picked up a thriller, sci-fi or fantasy book, got
          interested but was just not in the mood to read more straight/cis/allo
          stuff? So have we!
        </Text>
        <SearchForm />

        <Divider />
        <Alert
          message={<Title level={3}>What do we mean by 'queer'?</Title>}
          description={description}
          type="info"
          showIcon
        />
        <Divider />
        <Title level={3}>
          What about a random book?
          <Button type="primary" htmlType="button" onClick={() => refetch()}>
            Try another
          </Button>
        </Title>
        {data?.data && (
          <BookCard
            book={{
              id: data?.data[0].id,
              title: data?.data[0].title,
              author: data?.data[0].author,
              series: data?.data[0].series,
              description: data?.data[0].description,
              is_queer: data?.data[0].is_queer,
              cover: data?.data[0].cover,
              genres: data?.data[0].genres,
              approved: data?.data[0].approved,
              createdAt: data?.data[0].createdAT,
            }}
          />
        )}
      </div>
    </div>
  );
}
