import { Drawer } from "antd";
import { ReactElement } from "react";

interface IBaseDrawer {
  title: string;
  children: ReactElement;
  drawerShow: boolean;
  setDrawerShow: (drawerShow: boolean) => void;
}

export default function BaseDrawer({
  title,
  children,
  drawerShow,
  setDrawerShow,
}: IBaseDrawer) {
  const closeDrawer = () => {
    setDrawerShow(false);
  };
  return (
    <Drawer title={title} width={500} onClose={closeDrawer} open={drawerShow}>
      {children}
    </Drawer>
  );
}
