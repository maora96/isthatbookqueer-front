import { Form, Input } from "antd";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Search } = Input;

  const onSubmit = async (rawData: any) => {
    navigate(`/results?search=${rawData}`);
  };

  return (
    <div className={styles.container}>
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
  );
}
