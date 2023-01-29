import styles from "./styles.module.scss";
import Header from "../../components/Header";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";

export default function SuggestBookError() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <Result
          status="error"
          icon={<FrownOutlined />}
          title="Submission failed"
          subTitle="If the error persists, please contact us!"
          extra={[
            <Button type="primary" onClick={() => navigate("/suggest-book")}>
              Try again
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}
