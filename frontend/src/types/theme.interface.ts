import { IFile } from "./file.interface";

export interface ITheme {
  id: number;
  themeName: string;
  themeCode: string;
  themeHead: string;
  startDate: string;
  endDate: string;
  files: IFile[];
}

export interface IThemeAndFileDelete extends IFile {
  id: number;
  themeName: string;
  themeCode: string;
  themeHead: string;
  startDate: string;
  endData: string;
}

export interface IThemeCreateDto {
  themeName: string;
  themeCode: string;
  themeHead: string;
  endDate: string;
}
