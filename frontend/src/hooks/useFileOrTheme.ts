import { ThemeService } from "@/services/theme/theme.service";
import { ITheme } from "@/types/theme.interface";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { useActions } from "./useActions";

export const DeleteThemeOrFile = (
  type: "file" | "folder",
  currentItemId: number,
  refetch:
    | ((
        options?: RefetchOptions | undefined
      ) => Promise<QueryObserverResult<ITheme[], Error>>)
    | ((
        options?: RefetchOptions | undefined
      ) => Promise<QueryObserverResult<ITheme, Error>>)
) => {
  const { afterSuccessDelete } = useActions();

  const { mutate, error: err } = useMutation({
    mutationKey: ["delete theme"],
    mutationFn: () => ThemeService.delete(type, currentItemId),
    onSuccess() {
      refetch();
      afterSuccessDelete();
    },
    onError(error) {
      console.log(error);
      console.log(err);
    },
  });

  return { mutate, err };
};
