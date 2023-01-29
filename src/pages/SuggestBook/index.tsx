import styles from "./styles.module.scss";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import SuggestBookForm from "../../components/SuggestBookForm";
import SuggestCharacterForm from "../../components/SuggestCharacterForm";
import { Typography } from "antd";

export default function SuggestBook() {
  const [step, setStep] = useState("suggest-book");
  const [request, setRequest] = useState();

  const { Text, Title } = Typography;

  useEffect(() => {
    setStep("suggest-book");
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["content-container"]}>
        <div className={styles["content-header"]}>
          <Title level={3}>Suggest a book</Title>
          <Text>
            Please fill the form bellow to submit a book for consideration. It
            might take a few days for your suggestions to be approved, so don't
            worry if you can't find it on the website immediately!
          </Text>
        </div>
        {step === "suggest-book" && (
          <SuggestBookForm setStep={setStep} setRequest={setRequest} />
        )}

        {step === "suggest-characters" && (
          <SuggestCharacterForm request={request} />
        )}
      </div>
    </div>
  );
}
