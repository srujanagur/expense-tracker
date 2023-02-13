import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categories: [],
	transaction: [],
};

export const expenseSlice = createSlice({
	name: 'expense',
	initialState,
	reducers: {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getTransactions: (state) => {
			// empty
		},
	},
});

export const { getTransactions } = expenseSlice.actions;
export default expenseSlice.reducer;
