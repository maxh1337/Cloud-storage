"use client";

import { FC, useEffect, useState } from "react";

import Loader from "../Loader";

import { useActions } from "@/hooks/useActions";
import { useGetCurrentShown, useIsDeleteShown } from "@/hooks/useShowAndDelete";
import { ThemeService } from "@/services/theme/theme.service";
import { ITheme } from "@/types/theme.interface";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { Popconfirm } from "antd";
import Heading from "../Heading";
import Button from "../button/Button";
import CreateThemePopup from "../popup/CreateThemePopup";
import ThemeItem from "./catalog-item/ThemeItem";

interface ICatalog {
  data: ITheme[] | undefined;
  isLoading?: boolean;
  title?: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ITheme[], Error>>;
}

const Catalog: FC<ICatalog> = ({ title, data, isLoading, refetch }) => {
  const [isVisible, setIsVisible] = useState(false);
  const current = useGetCurrentShown();
  const isDeleteShown = useIsDeleteShown();
  const { afterSuccessDelete } = useActions();

  useEffect(() => {
    afterSuccessDelete();
  }, []);

  const { mutate, error: err } = useMutation({
    mutationKey: ["delete theme"],
    mutationFn: () => ThemeService.delete("folder", current),
    onSuccess() {
      refetch();
      afterSuccessDelete();
    },
    onError(error) {
      console.log(error);
      console.log(err);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <section>
      <CreateThemePopup
        isVisible={isVisible}
        onClick={setIsVisible}
        refetch={refetch}
      />
      {title && <Heading className="mb-5 text-blue m-4">{title}</Heading>}
      <div className=" mb-3 flex justify-between m-4">
        <Button
          variant="blue"
          className=" select-none"
          size="md"
          onClick={() => setIsVisible(!isVisible)}
        >
          Создать
        </Button>
        {isDeleteShown ? (
          <Popconfirm
            title="Удалить файл(ы)?"
            description="Все файлы будут перемещены в корзину"
            okText="Да"
            cancelText="Нет"
            disabled={!isDeleteShown}
            onConfirm={() => mutate()}
          >
            <Button disabled={!isDeleteShown} variant="red">
              Удалить
            </Button>
          </Popconfirm>
        ) : null}
      </div>

      {data?.length ? (
        <>
          <div className="grid grid-cols-5 gap-5 content-center mx-4">
            {data.map((theme) => (
              <ThemeItem key={theme.id} theme={theme} type="theme" />
            ))}
          </div>
        </>
      ) : (
        <div className=" text-white">There are no themes</div>
      )}
    </section>
  );
};

export default Catalog;
