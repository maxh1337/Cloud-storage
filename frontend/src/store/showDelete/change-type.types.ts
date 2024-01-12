export interface IDeleteThemeInitialState {
  type: "theme" | "file";
  selectedItemId: number;
}

export interface IDeleteInitialState {
  type: "theme" | "file" | "";
  isActive: boolean;
  selectedItemId: number;
  fileName: string;
}

export interface IAddFileName {
  fileName: string;
}
