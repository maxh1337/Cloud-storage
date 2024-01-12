import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  IAddFileName,
  IDeleteInitialState,
  IDeleteThemeInitialState,
} from "./change-type.types";

const initialState: IDeleteInitialState = {
  type: "",
  isActive: false,
  selectedItemId: 0,
  fileName: "",
};

export const showAndDeleteSlice = createSlice({
  name: "show delete and delete",
  initialState,
  reducers: {
    showDelete: (state, action: PayloadAction<IDeleteThemeInitialState>) => {
      if (
        state.isActive === true &&
        state.selectedItemId === action.payload.selectedItemId
      ) {
        state.isActive = !state.isActive;
        state.selectedItemId = 0;
        return;
      } else if (
        state.isActive === true &&
        state.selectedItemId !== action.payload.selectedItemId
      ) {
        state.type = action.payload.type;
        state.selectedItemId = action.payload.selectedItemId;
      } else {
        state.isActive = !state.isActive;
        state.type = action.payload.type;
        state.selectedItemId = action.payload.selectedItemId;
      }
    },
    afterSuccessDelete: (state) => {
      state.isActive = false;
      state.type = "";
      state.selectedItemId = 0;
    },
    addFileName: (state, action: PayloadAction<IAddFileName>) => {
      state.fileName = action.payload.fileName;
    },
  },
});
