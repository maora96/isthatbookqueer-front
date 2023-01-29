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
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const { Group } = Radio;
  const { Search } = Input;

  const onSubmit = async (data: any) => {
    const { user, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (user) {
      navigate("/admin");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <Form
          className={styles.form}
          layout="vertical"
          form={form}
          name="login"
          onFinish={onSubmit}
          hideRequiredMark
        >
          {/* <div className={styles["input-container"]}> */}

          <Item
            name="email"
            label="E-mail"
            rules={[{ required: true }]}
            className={styles["input-container"]}
          >
            <Input placeholder="example@email.com" />
          </Item>

          <Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
            className={styles["input-container"]}
          >
            <Input type="password" />
          </Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
          {/* </div> */}
        </Form>
      </div>
    </div>
  );
}
