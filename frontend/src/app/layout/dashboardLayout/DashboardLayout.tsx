"use client";

import styles from "@/assets/Home.module.scss";
import { UploadButton } from "@/ui/uploadButton";
import { FileOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[pathname]}
          items={[
            {
              key: `/dashboard`,
              icon: <FileOutlined rev={undefined} />,
              label: `Файлы`,
              onClick: () => router.push("/"),
            },
          ]}
        />
      </div>

      <div className="container">{children}</div>
    </main>
  );
};
