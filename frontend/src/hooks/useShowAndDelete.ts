import { useTypedSelector } from "./useTypedSelector";

export const useGetCurrentShown = () => {
  const shown = useTypedSelector((state) => state.changeType.selectedItemId);

  return shown;
};

export const useIsDeleteShown = () => {
  const isShown = useTypedSelector((state) => state.changeType.isActive);

  return isShown;
};

export const useChangeDownloadFileName = () => {
  const fileName = useTypedSelector((state) => state.changeType.fileName);

  return fileName;
};
