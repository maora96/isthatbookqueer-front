import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Button
          type="primary"
          htmlType="button"
          icon={<PlusOutlined />}
          onClick={() => navigate("/suggest-book")}
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
    </>
  );
}
