import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:3000';

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
	tagTypes: ['Category', 'Transaction'],

	endpoints: (builder) => ({
		// get categories
		getCategories: builder.query<any, void>({
			query: () => '/api/categories',
			providesTags: ['Category'],
		}),
		// get labels
		getLabels: builder.query<any, void>({
			query: () => '/api/labels',
			providesTags: ['Transaction'],
		}),
		// create new transaction
		newTransaction: builder.mutation({
			query: (initialTransaction) => ({
				url: '/api/transactions',
				method: 'POST',
				body: initialTransaction,
			}),
			invalidatesTags: ['Transaction'],
		}),

		// delete transaction
		deleteTransaction: builder.mutation({
			query: (recordId) => ({
				url: '/api/transactions',
				method: 'DELETE',
				body: recordId,
			}),
			invalidatesTags: ['Transaction'],
		}),
	}),
});

export default apiSlice;
