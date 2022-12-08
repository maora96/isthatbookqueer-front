import { Menu, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import BaseDrawer from "../BaseDrawer";
import SuggestForm from "../SuggestForm";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartTwoTone,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IFavorite {
  id: number;
}

export default function Favorite({ id }: IFavorite) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const favoritesStored = localStorage.getItem("favorites");

    if (favoritesStored !== null && favoritesStored !== undefined) {
      const oldFavorites = JSON.parse(favoritesStored);
      setFavorites(oldFavorites);
    }
  }, []);

  const favoriteBook = (id: number) => {
    const favoritesStored = localStorage.getItem("favorites");

    if (favoritesStored !== null && favoritesStored !== undefined) {
      const oldFavorites = JSON.parse(favoritesStored);
      const isAlreadyInFavorites = oldFavorites?.find(
        (iid: string) => Number(iid) === id
      );
      console.log(isAlreadyInFavorites);

      let newFavorites = [];

      if (isAlreadyInFavorites) {
        newFavorites = oldFavorites?.filter(
          (iid: string) => Number(iid) !== id
        );
      } else {
        newFavorites = [...favorites, id];
      }
      setFavorites(newFavorites);

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const favorites = [id];
      setFavorites(favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  const isFavorited = favorites?.find((iid) => iid === id);
  console.log("isFavorited", isFavorited);
  return (
    <button className={styles.favorite} onClick={() => favoriteBook(id)}>
      {isFavorited ? (
        <Tooltip title="Book is favorited">
          <HeartTwoTone twoToneColor="red" className={styles.icon} />
        </Tooltip>
      ) : (
        <Tooltip title="Book isn't favorited">
          <HeartTwoTone twoToneColor="gray" className={styles.icon} />
        </Tooltip>
      )}
    </button>
  );
}
