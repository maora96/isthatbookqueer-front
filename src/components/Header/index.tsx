import { Menu, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import BaseDrawer from "../BaseDrawer";
import SuggestForm from "../SuggestForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [drawerShow, setDrawerShow] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Button
          type="primary"
          htmlType="button"
          icon={<PlusOutlined />}
          onClick={() => setDrawerShow(true)}
        >
          Suggest a book
        </Button>
        <div>
          <Button type="link" htmlType="button" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button
            type="link"
            htmlType="button"
            onClick={() => navigate("/about")}
          >
            About
          </Button>
          <Button
            type="link"
            htmlType="button"
            onClick={() => navigate("/favorites")}
          >
            Favorites
          </Button>
        </div>
      </div>
      <BaseDrawer
        title="Suggest a book"
        drawerShow={drawerShow}
        setDrawerShow={setDrawerShow}
      >
        <SuggestForm setDrawerShow={setDrawerShow} />
      </BaseDrawer>
    </>
  );
}
