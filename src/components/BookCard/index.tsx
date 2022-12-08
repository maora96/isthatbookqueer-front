import { Button, Tag, Divider, Tooltip } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Book } from "../../types";
import { useNavigate } from "react-router-dom";

interface IBookCard {
  book: Book;
}

export default function BookCard({ book }: IBookCard) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={book.cover} alt={book.title} />
      <div className={styles["card-content"]}>
        <div className={styles["card-header"]}>
          <div className={styles.left}>
            <h3>{book.title}</h3>
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
          </div>
        </div>
        <Divider />
        <div className={styles.description}>
          <div className={styles.genres}>
            {book.genres?.map((gen: string) => (
              <Tag color="cyan">{gen}</Tag>
            ))}
          </div>
          {book.description.split("\n")[0]} [...]
        </div>
        <div className={styles.links}>
          <Button
            htmlType="button"
            onClick={() => navigate(`/book/${book.id}`)}
          >
            More
          </Button>
        </div>
      </div>
    </div>
  );
}
