"use client";

import styles from "@/assets/Home.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { ThemeService } from "@/services/theme/theme.service";
import { IPageIdParam } from "@/types/page-params";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import FileCatalog from "./FileCatalog";
import Catalog from "./ThemeCatalog";

interface IExplorerType extends IPageIdParam {
  type: "file" | "theme";
}

const ThemeExplorer: FC<IExplorerType> = ({ type, params }) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(params?.id);
  }, []);

  const {
    data: themes,
    isLoading: isLoading1,
    refetch: refetch1,
  } = useQuery({
    queryKey: ["theme explorer"],
    queryFn: () => ThemeService.getAll(),
    select: ({ data }) => data,
    enabled: !!user,
  });

  const {
    data: files,
    isLoading: isLoading2,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["file explorer"],
    queryFn: () => ThemeService.getById(params?.id as number),
    select: ({ data }) => data,
    enabled: !!user && !!params?.id,
  });

  return (
    <>
      {type === "theme" ? (
        <>
          <section className={styles.themeLayout}>
            <Catalog
              data={themes}
              isLoading={isLoading1}
              refetch={refetch1}
              title="Темы"
            />
          </section>
        </>
      ) : (
        <>
          <section className={styles.layout}>
            <FileCatalog
              data={files}
              isLoading={isLoading2}
              refetch={refetch2}
              title={files?.themeName}
              params={params}
            />
          </section>
        </>
      )}
      {/* <DashboardLayout refetch={refetch} /> */}
    </>
  );
};

export default ThemeExplorer;
