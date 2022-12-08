import { Form, Input, Select, Space, Radio, Button, Alert } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { supabase } from "../../api";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const { Group } = Radio;
  const { Search } = Input;

  const onSubmit = async (rawData: any) => {
    console.log("search", rawData);

    navigate(`/results?search=${rawData}`);

    // const { data, error } = await supabase
    //   .from("books")
    //   .select()
    //   .ilike("title", `%${rawData}%`)
    //   .eq("approved", false);

    // console.log("result:", data, error);
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        layout="vertical"
        form={form}
        name="search-book"
        onFinish={onSubmit}
        hideRequiredMark
      >
        {/* <div className={styles["input-container"]}> */}
        <Search
          placeholder="Search for a book by title or author"
          onSearch={onSubmit}
          enterButton
        />
        {/* <Item
            name="title"
            label="Search for a book..."
            rules={[{ required: true }]}
            className={styles["input-container"]}
          >
            <Input placeholder="Example title..." />
            <Button htmlType="button" type="primary">
              Search
            </Button>
          </Item> */}
        {/* <Button htmlType="button" type="primary">
            Search
          </Button> */}
        {/* </div> */}
      </Form>
    </div>
  );
}
