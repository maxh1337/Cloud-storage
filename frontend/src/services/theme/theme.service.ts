import instance, { axiosClassic } from "@/api/api.interceptor";
import { ITheme, IThemeAndFileDelete } from "@/types/theme.interface";
import { IThemeCreateDto } from "./../../types/theme.interface";

const THEME = "folder";

export interface IDeleteData {
  id: number;
}

export const ThemeService = {
  async getAll() {
    return axiosClassic<ITheme[]>({
      url: THEME,
      method: "GET",
    });
  },

  async delete(type: "folder" | "file", id: number) {
    return instance<IThemeAndFileDelete>({
      url: `${type}/delete/${id}`,
      method: "DELETE",
    });
  },

  async create(data: IThemeCreateDto) {
    return instance<ITheme>({
      url: `${THEME}`,
      method: "POST",
      data: data,
    });
  },

  async getById(id: string | number) {
    return instance<ITheme>({
      url: `${THEME}/${id}`,
      method: "GET",
    });
  },
};
