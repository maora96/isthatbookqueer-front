import { Button, Form, Input, Select, Card, Typography } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import {
  genders,
  romanticOrientations,
  sexualOrientations,
} from "../../utils/static";
import { useMutation } from "react-query";
import { createBookClient } from "../../api/client";
import { useNavigate } from "react-router-dom";

interface ISuggestCharacterForm {
  request: any;
}

export default function SuggestCharacterForm({
  request,
}: ISuggestCharacterForm) {
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const { Text, Title } = Typography;

  const navigate = useNavigate();

  const [characters, setCharacters] = useState<any>([]);

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
    const finalRequest = {
      ...request,
      characters: [...characters],
    };
    createUserMutation.mutate(finalRequest);
  };

  const addCharacter = () => {
    const character = form.getFieldsValue();
    const newCharacters = [...characters];
    newCharacters.push(character);

    setCharacters(newCharacters);
    form.resetFields();
  };
  return (
    <>
      <div className={styles["content-header"]}>
        <Title level={4}>Suggest characters</Title>
        <Text>
          Suggesting characters for <Text strong>{request.title}</Text>.
        </Text>
      </div>
      <Form
        layout="vertical"
        requiredMark
        form={form}
        name="suggest-character"
        onFinish={onSubmit}
      >
        <Card
          title="Add character"
          style={{
            marginBottom: 20,
          }}
        >
          <Item name="name" label="Name">
            <Input placeholder="Cool character name" />
          </Item>
          <Item name="sexualOrientation" label="Sexual Orientation">
            <Select placeholder="Select sexual orientation" allowClear>
              {sexualOrientations.map((sexualOrientation: any) => (
                <Option value={sexualOrientation.value}>
                  {sexualOrientation.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name="romanticOrientation" label="Romantic Orientation">
            <Select placeholder="Select romantic orientation" allowClear>
              {romanticOrientations.map((romanticOrientation: any) => (
                <Option value={romanticOrientation.value}>
                  {romanticOrientation.name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name="gender" label="Gender">
            <Select placeholder="Select gender" allowClear>
              {genders.map((gender: any) => (
                <Option value={gender.value}>{gender.name}</Option>
              ))}
            </Select>
          </Item>
        </Card>
        <Item>
          <Button onClick={addCharacter} type="primary">
            Add character
          </Button>
        </Item>

        <div className={styles["character-container"]}>
          {characters.map((character: any) => (
            <Card
              title={character.name}
              style={{
                marginBottom: 20,
                width: 200,
              }}
            >
              <p>{character.sexualOrientation}</p>
              <p>{character.romanticOrientation}</p>
              <p>{character.gender}</p>
            </Card>
          ))}
        </div>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={characters.length === 0}
          >
            Submit
          </Button>
        </Item>
      </Form>
    </>
  );
}
