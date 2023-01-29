import styles from "./styles.module.scss";
import BookCard from "../../components/BookCard";
import { Book } from "../../types";
import { Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";

interface ICardsContainer {
  books: Book[];
}

export default function CardsContainer({ books }: ICardsContainer) {
  return (
    <>
      {books.length === 0 ? (
        <div className={styles.result}>
          <div className={styles.result}>
            <Result
              status="error"
              icon={<FrownOutlined />}
              title="No book found"
              subTitle="If you know more about this book, please consider suggesting it by clicking the 'Suggest a book' button at the top left corner of the
              page!"
            />
          </div>
        </div>
      ) : (
        <div className={styles["cards-container"]}>
          {books?.map((book: Book) => (
            <BookCard book={book} />
          ))}
        </div>
      )}
    </>
  );
}
