import { Tooltip } from "antd";
import styles from "./styles.module.scss";
import { HeartTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface IFavorite {
  id: string;
}

export default function Favorite({ id }: IFavorite) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const favoritesStored = localStorage.getItem("favorites");

    if (favoritesStored !== null && favoritesStored !== undefined) {
      const oldFavorites = JSON.parse(favoritesStored);
      setFavorites(oldFavorites);
    }
  }, []);

  const favoriteBook = (id: string) => {
    const favoritesStored = localStorage.getItem("favorites");

    if (favoritesStored !== null && favoritesStored !== undefined) {
      const oldFavorites = JSON.parse(favoritesStored);
      const isAlreadyInFavorites = oldFavorites?.find(
        (iid: string) => iid === id
      );

      let newFavorites = [];

      if (isAlreadyInFavorites) {
        newFavorites = oldFavorites?.filter((iid: string) => iid !== id);
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
