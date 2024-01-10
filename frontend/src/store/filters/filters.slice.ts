import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IFiltersActionsPayload, IFiltersState } from './filters.types'

const initialState: IFiltersState = {
	isFilterUpdated: false,
	queryParams: {
		searchTerm: ''
	}
}

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		updateQueryParam: (
			state,
			action: PayloadAction<IFiltersActionsPayload>
		) => {
			const { key, value } = action.payload
			state.queryParams[key] = value
			state.isFilterUpdated = true
		},
		resetFilterUpdate: state => {
			state.isFilterUpdated = false
		}
	}
})
