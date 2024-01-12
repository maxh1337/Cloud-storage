import instance from "@/api/api.interceptor";
import { useActions } from "@/hooks/useActions";
import { IFormData } from "@/types/file.interface";
import { TypeParamId } from "@/types/page-params";
import { ITheme } from "@/types/theme.interface";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import cn from "clsx";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";

export interface ICreateThemePopupProps {
  isVisible: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ITheme, Error>>;
  params: TypeParamId | undefined;
}

const UploadFilePopup: FC<ICreateThemePopupProps> = ({
  isVisible,
  onClick,
  refetch,
  params,
}) => {
  const [fio, setFio] = useState("");
  const [otdel, setOtdel] = useState("");

  const [file, setFile] = useState<File | undefined>();
  const FILES = "file";
  const filePicker = useRef(null);
  const { afterSuccessDelete } = useActions();

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof file === "undefined") return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("executorName", fio);
    formData.append("developmentDepartment", otdel);

    return instance<IFormData>({
      url: `${FILES}/upload/${params?.id as number}`,
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      data: formData,
    }).then(() => {
      refetch();
      afterSuccessDelete();
      onClick(!isVisible);
    });
  }

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  return (
    <section
      className={isVisible ? "popup popup_opened" : "popup"}
      onClick={() => {
        onClick(!isVisible);
        setFio("");
        setOtdel("");
      }}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          title="close-button"
          type="reset"
          className="popup__close-button popup__close-button_parent-corners_straight"
        />
        <h2 className="popup__title">Загрузить файл</h2>
        <form className="form" onSubmit={handleOnSubmit}>
          <input
            className="form__input"
            placeholder="Фио Исполнителя"
            value={fio}
            onChange={(e) => setFio(e.target.value)}
          />
          <input
            className="form__input"
            placeholder="Отдел-разработчик"
            value={otdel}
            onChange={(e) => setOtdel(e.target.value)}
          />
          <input
            type="file"
            ref={filePicker}
            onChange={handleOnChange}
            className={cn({
              // button colors
              "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100":
                true,
              //   // button shape and spacing
              "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
              "file:px-4 file:py-3 file:mr-4 file:mb-2 file:border-none": true,
              "file:hover: cursor-pointer": true,
              //   // overall input styling
              //   "hover:cursor-pointer border rounded-lg text-gray-400": true,
            })}
          />
          <button
            title="Загрузить"
            type="submit"
            className="popup__button form__button"
          >
            Загрузить
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadFilePopup;
