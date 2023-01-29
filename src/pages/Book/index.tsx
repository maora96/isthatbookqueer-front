import styles from "./styles.module.scss";
import { Divider, Card, Tooltip, Tag, Typography, Spin } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import Favorite from "../../components/Favorite";
import { useGetBook } from "../../hooks/books";

export default function BookPage() {
  const { id } = useParams();
  const { Text, Title } = Typography;

  const { data, isFetching } = useGetBook(id!);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        {isFetching ? (
          <div className={styles.result}>
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles["book-container"]}>
            <div className={styles["book-content"]}>
              <div className={styles["card-extras"]}>
                <img src={data?.data.cover} alt={data?.data.title} />
              </div>
              <div className={styles["card-content"]}>
                <div className={styles["card-header"]}>
                  <div className={styles.left}>
                    <Title level={2}>{data?.data.title}</Title>
                    <Title level={5}>by {data?.data.author}</Title>
                    {data?.data?.series ?? (
                      <Title level={5}>{data?.data.series}</Title>
                    )}
                  </div>
                  <div className={styles.right}>
                    {data?.data.is_queer ? (
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
                    <Favorite id={data?.data.id} />
                  </div>
                </div>
                <Divider />
                <div className={styles.description}>
                  <div className={styles.genres}>
                    {data?.data.genres?.map((gen: string) => (
                      <Tag color="cyan">{gen}</Tag>
                    ))}
                  </div>
                  {data?.data.description
                    .split("\n")
                    ?.map((paragraph: string) => (
                      <Text>{paragraph}</Text>
                    ))}

                  {data?.data.is_queer && (
                    <>
                      {data.data.characters.length !== 0 && (
                        <>
                          <Title level={3}>Queer characters:</Title>
                          <div className={styles["character-container"]}>
                            {data?.data.characters.map((character: any) => (
                              <Card
                                title={character.name}
                                style={{
                                  marginBottom: 20,
                                  width: 200,
                                }}
                              >
                                <div>
                                  <Text>{character.sexualOrientation}</Text>
                                </div>
                                <div>
                                  <Text>{character.romanticOrientation}</Text>
                                </div>
                                <div>
                                  <Text>{character.gender}</Text>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
