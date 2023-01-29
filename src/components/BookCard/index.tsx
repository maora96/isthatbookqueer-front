import { Button, Tag, Divider, Tooltip, Typography } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Book } from "../../types";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface IBookCard {
  book: Book;
}

export default function BookCard({ book }: IBookCard) {
  const navigate = useNavigate();
  const { Text, Title } = Typography;
  return (
    <div className={styles.container}>
      <img src={book.cover} alt={book.title} />
      <div className={styles["card-content"]}>
        <div className={styles["card-header"]}>
          <div className={styles.left}>
            <Title level={3}>{book.title}</Title>
            <Title level={5}>by {book.author}</Title>
            {book?.series && <Title level={5}>{book.series}</Title>}
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
          <Text>{book.description.split("\n")[0]} [...]</Text>
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
