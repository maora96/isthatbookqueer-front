import styles from "./styles.module.scss";
import Header from "../../components/Header";
import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function SuggestBookSuccess() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <Result
          status="success"
          icon={<SmileOutlined />}
          title="Book successfuly suggested!"
          subTitle="Please wait a few days while it undergoes our approval proccess!"
          extra={[
            <Button type="primary" onClick={() => navigate("/suggest-book")}>
              Add another character
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}
