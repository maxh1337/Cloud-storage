import { changeTypeSlice } from './change-type/change-type.slice'
import { filtersSlice } from './filters/filters.slice'
import * as userActions from './user/user.actions'

export const rootActions = {
	...userActions,
	...filtersSlice.actions,
	...changeTypeSlice.actions
}
