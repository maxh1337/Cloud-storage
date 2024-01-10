"use client";

import { CloudOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Popover } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Header.module.scss";

import { useActions } from "@/hooks/useActions";
import { useProfile } from "@/hooks/useProfile";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const { logout } = useActions();

  const data = useProfile();

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            Cloud Storage
          </h2>

          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[pathname]}
            onSelect={({ key }) => push(key)}
            items={[
              { key: "/dashboard", label: "Главная" },
              { key: "/dashboard/profile", label: "Профиль" },
            ]}
          />
        </div>

        <div className={styles.headerRight}>
          <p>{data?.profile?.fio}</p>
          <Popover
            trigger="click"
            content={
              <Button onClick={logout} type="primary" danger>
                Выйти
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};
