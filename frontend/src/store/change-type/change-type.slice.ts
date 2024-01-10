import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IChangeTypelInitialState } from './change-type.types'

const initialState: IChangeTypelInitialState = {
	type: 'article'
}

export const changeTypeSlice = createSlice({
	name: 'change type',
	initialState,
	reducers: {
		changeCurrentType: (
			state,
			action: PayloadAction<IChangeTypelInitialState>
		) => {
			console.log(action.payload.type)
			state.type = action.payload.type
		}
		// prevSlide: state => {
		// 	if (state.selectedItemIndex > 0) state.selectedItemIndex -= 1
		// },
		// selectSlide: (state, action: PayloadAction<number>) => {
		// 	state.selectedItemIndex = action.payload
		// },
	}
})
