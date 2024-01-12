import { useActions } from "@/hooks/useActions";
import { useGetCurrentShown } from "@/hooks/useShowAndDelete";
import { IFile } from "@/types/file.interface";
import { FolderOutlined } from "@ant-design/icons";
import cn from "clsx";
import { FC } from "react";
import styles from "./ThemeItem.module.scss";

const FileItem: FC<{ file: IFile; type: "file" }> = ({ file, type }) => {
  const currentShown = useGetCurrentShown();

  const { showDelete, addFileName } = useActions();

  return (
    <div
      className={cn(
        {
          " bg-gray2": currentShown === file.id,
        },
        styles.root
      )}
      onClick={() => {
        showDelete({ type: type, selectedItemId: file.id });
        addFileName({ fileName: file.originalName });
      }}
    >
      <div className={styles.icon}>
        <FolderOutlined height={80} width={80} />
      </div>
      <span className=" select-none">{file.originalName}</span>
    </div>
  );
};

export default FileItem;
