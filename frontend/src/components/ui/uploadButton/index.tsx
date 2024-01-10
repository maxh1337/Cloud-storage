import instance from "@/api/api.interceptor";
import { IFormData } from "@/types/file.interface";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import Button from "../button/Button";

export const UploadButton: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();
  const FILES = "file";
  const filePicker = useRef(null);

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof file === "undefined") return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("executorName", "Воробьев Максим Михайлович");
    formData.append("developmentDepartment", "Политех");

    console.log(formData);

    return instance<IFormData>({
      url: `${FILES}/upload/1`,
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      data: formData,
    }).then((r) => console.log(r.data));
  }

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  return (
    <>
      <input
        type="file"
        ref={filePicker}
        onChange={handleOnChange}
        className={classNames({
          // button colors
          "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100":
            true,
          // button shape and spacing
          "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
          "file:px-4 file:py-3 file:mr-4 file:mb-2 file:border-none": true,
          // overall input styling
          "hover:cursor-pointer border rounded-lg text-gray-400": true,
        })}
      ></input>
      <Button variant="blue" className=" mt-2" onClick={handleOnSubmit}>
        Отправить
      </Button>
    </>
  );
};
