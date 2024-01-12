import { useActions } from "@/hooks/useActions";
import { useGetCurrentShown } from "@/hooks/useShowAndDelete";
import { ITheme } from "@/types/theme.interface";
import { FolderOutlined } from "@ant-design/icons";
import cn from "clsx";
import { useRouter } from "next/navigation";
import { FC } from "react";
import styles from "./ThemeItem.module.scss";

const ThemeItem: FC<{ theme: ITheme; type: "theme" }> = ({ theme, type }) => {
  const router = useRouter();

  const currentShown = useGetCurrentShown();

  const { showDelete } = useActions();

  return (
    <div
      className={cn(
        {
          " bg-gray2": currentShown === theme.id,
        },
        styles.root
      )}
      onDoubleClick={() => router.push(`/theme/${theme.id}`)}
      onClick={() => showDelete({ type: type, selectedItemId: theme.id })}
    >
      <div className={styles.icon}>
        <FolderOutlined height={80} width={80} />
      </div>
      <span className=" select-none">{theme.themeName}</span>
    </div>
  );
};

export default ThemeItem;
