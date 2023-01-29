import styles from "./styles.module.scss";
import { Typography, Result } from "antd";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer";
import { FrownOutlined } from "@ant-design/icons";
import { useGetFavorites } from "../../hooks/books";

export default function Favorites() {
  const [ids, setIds] = useState([]);

  const { Title } = Typography;
  const { data } = useGetFavorites(ids);
  useEffect(() => {
    const favoritesStored = localStorage.getItem("favorites");

    if (favoritesStored !== null && favoritesStored !== undefined) {
      const parsedFavorites = JSON.parse(favoritesStored);
      if (parsedFavorites) setIds(parsedFavorites);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <Title level={1}>Your favorite books:</Title>
        {data?.data?.length === 0 ? (
          <div className={styles.result}>
            <Result
              status="error"
              icon={<FrownOutlined />}
              title="No book found"
              subTitle=" You can favorite a book by going to its page and clicking the
          heart icon!"
              extra={[]}
            />
          </div>
        ) : (
          <CardsContainer books={data?.data} />
        )}
      </div>
    </div>
  );
}
