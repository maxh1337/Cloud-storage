"use client";

import { FC, useEffect, useState } from "react";

import Loader from "../Loader";

import { useActions } from "@/hooks/useActions";
import { handleDownload } from "@/hooks/useFile";
import { DeleteThemeOrFile } from "@/hooks/useFileOrTheme";
import {
  useChangeDownloadFileName,
  useGetCurrentShown,
  useIsDeleteShown,
} from "@/hooks/useShowAndDelete";
import { TypeParamId } from "@/types/page-params";
import { ITheme } from "@/types/theme.interface";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
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

  const { mutate } = DeleteThemeOrFile("file", current, refetch);

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
                  handleDownload(fileName, currentFileId);
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
