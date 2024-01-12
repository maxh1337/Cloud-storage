"use client";

import { FC, useEffect, useState } from "react";

import Loader from "../Loader";

import instance from "@/api/api.interceptor";
import { useActions } from "@/hooks/useActions";
import {
  useChangeDownloadFileName,
  useGetCurrentShown,
  useIsDeleteShown,
} from "@/hooks/useShowAndDelete";
import { ThemeService } from "@/services/theme/theme.service";
import { TypeParamId } from "@/types/page-params";
import { ITheme } from "@/types/theme.interface";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { Popconfirm } from "antd";
import Heading from "../Heading";
import Button from "../button/Button";
import UploadFilePopup from "../popup/UploadFilePopup";
import FileItem from "./catalog-item/FileItem";

interface ICatalog {
  data: ITheme | undefined;
  isLoading?: boolean;
  title?: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ITheme, Error>>;
  params: TypeParamId | undefined;
}

const FileCatalog: FC<ICatalog> = ({
  title,
  data,
  isLoading,
  refetch,
  params,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const current = useGetCurrentShown();
  const isDeleteShown = useIsDeleteShown();
  const { afterSuccessDelete } = useActions();
  const currentFileId = useGetCurrentShown();
  const fileName = useChangeDownloadFileName();

  useEffect(() => {
    afterSuccessDelete();
  }, []);

  const { mutate, error: err } = useMutation({
    mutationKey: ["delete theme"],
    mutationFn: () => ThemeService.delete("file", current),
    onSuccess() {
      refetch();
      afterSuccessDelete();
    },
    onError(error) {
      console.log(error);
    },
  });

  async function handleDownload() {
    return instance<File>({
      url: `file/download/${currentFileId}`,
      method: "GET",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  if (isLoading) return <Loader />;

  return (
    <section>
      <UploadFilePopup
        isVisible={isVisible}
        onClick={setIsVisible}
        refetch={refetch}
        params={params}
      />
      {title && (
        <Heading className="m-5 text-blue">Страница темы - {title}</Heading>
      )}
      <div className="flex text-blue m-5 text-center">
        <p>Шифр темы: </p>
        <p className="ml-1">{data?.themeCode}</p>
      </div>
      <div className="flex text-blue m-5 text-center">
        <p>Руководитель: </p>
        <p className="ml-1">{data?.themeHead}</p>
      </div>
      <div className="flex text-blue m-5 text-center">
        <p>Дата окончания: </p>
        <p className="ml-1">{data?.endDate}</p>
      </div>
      <div className=" mb-3 flex justify-between m-4">
        <Button
          variant="blue"
          className=" select-none"
          size="md"
          onClick={() => setIsVisible(!isVisible)}
        >
          Загрузить
        </Button>
        <div>
          {isDeleteShown ? (
            <>
              <Button
                disabled={!isDeleteShown}
                variant="blue"
                className=" mr-4"
                onClick={() => {
                  handleDownload();
                }}
              >
                Скачать файл
              </Button>
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
            </>
          ) : null}
        </div>
      </div>
      {data?.files?.length ? (
        <>
          <div className="grid grid-cols-5 gap-5 content-center mx-4">
            {data?.files?.map((file) => (
              <FileItem key={file.id} file={file} type="file" />
            ))}
          </div>
        </>
      ) : (
        <div className=" text-white">There are no files</div>
      )}
    </section>
  );
};

export default FileCatalog;
