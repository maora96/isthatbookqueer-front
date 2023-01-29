import { Button, Form, Input, Select, Switch } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import { supabase } from "../../api";
import { genres } from "../../utils/static";
import { useMutation } from "react-query";
import { createBookClient } from "../../api/client";
import { useNavigate } from "react-router-dom";

interface ISuggestBookForm {
  setStep: (step: string) => void;
  setRequest: any;
}

export default function SuggestBookForm({
  setStep,
  setRequest,
}: ISuggestBookForm) {
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const { TextArea } = Input;

  const navigate = useNavigate();

  const onSwitchChange = (e: any) => {
    setIsQueer(e);
  };

  const [coverURL, setCoverURL] = useState("");
  const [isQueer, setIsQueer] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createUserMutation = useMutation(
    async (data: any) => createBookClient(data),
    {
      onSuccess: () => {
        navigate("/suggest-book/success");
      },
      onError: () => {
        navigate("/suggest-book/error");
      },
    }
  );

  const onSubmit = async (rawData: any) => {
    const request = {
      ...rawData,
      cover: coverURL,
      approved: false,
      series: rawData.series ?? null,
      is_queer: isQueer,
      characters: [],
    };
    if (rawData.is_queer) {
      setStep("suggest-characters");
      setRequest(request);
    } else {
      createUserMutation.mutate(request);
    }
  };

  const uploadImage = async (e: any) => {
    const coverName = form.getFieldValue("title");
    if (coverName === undefined) {
      setErrorMessage(
        "Please fill the book's title before uploading an image."
      );
    } else {
      const { data, error } = await supabase.storage
        .from("covers")
        .upload(coverName, e.target.files[0]);

      const { data: d, error: er } = supabase.storage
        .from("covers")
        .getPublicUrl(coverName);
      if (d?.publicURL) {
        setCoverURL(d?.publicURL);
      }
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        requiredMark
        form={form}
        name="suggest-book"
        onFinish={onSubmit}
      >
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
            {genres.map((genre: any) => (
              <Option value={genre.value}>{genre.name}</Option>
            ))}
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

        <Item name="cover" label="Cover">
          {coverURL && <img src={coverURL} className={styles.cover} />}
          <input
            type="file"
            id="myFile"
            name="filename"
            onChange={uploadImage}
          />
          {errorMessage && errorMessage}
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
}
