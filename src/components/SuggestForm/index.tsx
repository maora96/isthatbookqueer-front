import {
  Menu,
  Button,
  Tag,
  Divider,
  Form,
  Input,
  Select,
  Switch,
  Upload,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./styles.module.scss";
import { supabase } from "../../api";

interface ISuggestForm {
  setDrawerShow: (drawerShow: boolean) => void;
}

export default function SuggestForm({ setDrawerShow }: ISuggestForm) {
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const { TextArea } = Input;

  const onSwitchChange = (e: any) => {
    setIsQueer(e);
  };

  const [characters, setCharacters] = useState([]);
  const [coverURL, setCoverURL] = useState("");
  const [isQueer, setIsQueer] = useState(false);

  const onSubmit = async (rawData: any) => {
    console.log(rawData);
    const values = {
      ...rawData,
      cover: coverURL,
      approved: false,
      series: rawData.series ? rawData.series : null,
    };

    console.log(values);
    const { data, error } = await supabase
      .from("books")
      .insert({ ...values })
      .select();
    console.log(data, error);
    if (data) {
      setDrawerShow(false);
    }
  };

  const uploadImage = async (e: any) => {
    console.log(e);

    const { data, error } = await supabase.storage
      .from("covers")
      .upload("cover2", e.target.files[0]);

    const { data: d, error: er } = supabase.storage
      .from("covers")
      .getPublicUrl("cover2");
    console.log(data, error);
    console.log(e.target.files[0]);
    console.log("1111111111", d, er);
    if (d?.publicURL) {
      setCoverURL(d?.publicURL);
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        hideRequiredMark
        form={form}
        name="suggest-book"
        onFinish={onSubmit}
      >
        <Item name="cover" label="Cover">
          <img src={coverURL} className={styles.cover} />
          <input
            type="file"
            id="myFile"
            name="filename"
            onChange={uploadImage}
          />
        </Item>
        <Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Cool book title" />
        </Item>

        <Item name="author" label="Author" rules={[{ required: true }]}>
          <Input placeholder="Jane Doe" />
        </Item>

        <Item name="series" label="Series (if any)">
          <Input placeholder="Impressive series title" />
        </Item>

        <Item name="genres" label="Genres" rules={[{ required: true }]}>
          <Select
            placeholder="Select at least one genre"
            mode="multiple"
            allowClear
          >
            <Option value="fantasy">Fantasy</Option>
            <Option value="sci-fi">Sci-fi</Option>
            <Option value="thriller">Thriller</Option>
            <Option value="romance">Romance</Option>
            <Option value="queer">Queer</Option>
          </Select>
        </Item>

        <Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={6} />
        </Item>

        <Item name="is_queer" label="Is the book queer?">
          <Switch onChange={onSwitchChange} />
        </Item>

        {isQueer && (
          <Item
            name="queer_data"
            label="Which characters are queer? If possible, please let us know how they identify."
          >
            <TextArea rows={4} />
          </Item>
        )}

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
}
