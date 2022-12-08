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
} from "antd";
import SearchForm from "../../components/SearchForm";
import Header from "../../components/Header";
import BookCard from "../../components/BookCard";
import { supabase } from "../../api";

export default function Home() {
  const result = supabase.from("books").select().order("RANDOM()");

  console.log(result);
  const description = (
    <p>
      This website, for practical reasons, defines queer books as books where{" "}
      <strong>one or more main/lead characters are queer</strong>, that is, are
      identified by the author or readers as belonging to the queer community.{" "}
      <em>And</em> by main/lead characters we are speaking of characters who
      either <strong>are POV characters or are important to the story</strong>.
    </p>
  );
  console.log("wtf");
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <h1>Search for a book!</h1>
        <p>
          Have you ever picked up a thriller, sci-fi or fantasy book, got
          interested but was just not in the mood to read more straight/cis/allo
          stuff? So have we!
        </p>
        <SearchForm />

        <Divider />
        <Alert
          message="What do we mean by 'queer'?"
          description={description}
          type="info"
          showIcon
        />
        {/* <Divider />
        <h3>
          What about a random book?
          <Button type="primary" htmlType="button">
            Try another
          </Button>
        </h3>
        <BookCard /> */}
      </div>
    </div>
  );
}
