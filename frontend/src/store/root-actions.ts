import { showAndDeleteSlice } from "./showDelete/show-delete.slice";
import * as userActions from "./user/user.actions";

export const rootActions = {
  ...userActions,
  ...showAndDeleteSlice.actions,
};
