import styles from "./styles.module.scss";
import { Typography } from "antd";
import Header from "../../components/Header";

export default function About() {
  const { Text, Title } = Typography;
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <Title level={1}>About</Title>
        <Text>
          Hey, there! I'm Ren, an aroace queer writer by night and a web dev by
          day. This website is a passion project that came to fruition after way
          too many hours browsing Goodreads or Amazon looking for non-romance
          genre fiction that included queer characters as protagonists/important
          characters. It's very much a work in progress but feel free to make
          suggestions (I'm on <a href="">Twitter</a>!) and, if you can, support
          the project by leaving me a tip on <a href="">ko-fi</a>. Hope you
          enjoy your stay!
        </Text>
      </div>
    </div>
  );
}
