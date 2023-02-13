/* eslint-disable react/prop-types */
import * as React from 'react';

import { apiSlice } from '../redux/apiSlice';
import { MdDeleteForever } from 'react-icons/md';

const List = () => {
	const { data, isFetching, isSuccess, isError } = apiSlice.useGetLabelsQuery();
	const [deleteTransaction] = apiSlice.useDeleteTransactionMutation();
	let Transactions;
	const handlerClick = (e: any) => {
		if (!e.target.dataset.id) return 0;
		deleteTransaction({ _id: e.target.dataset.id });
	};
	if (isFetching) {
		Transactions = <div>Fetching</div>;
	} else if (isSuccess) {
		Transactions = data.map((v: any, i: any) => (
			<Transaction key={i} category={v} handler={handlerClick} />
		));
	} else if (isError) {
		Transactions = <div>Error</div>;
	}
	// console.log(Transactions);
	// console.log('data', data);
	return (
		<div className='flex flex-col py-6 gap-3'>
			<h1 className='py-4 font-bold text-xl'>History</h1>
			{Transactions}
		</div>
	);
};

function Transaction({ category, handler }: any) {
	if (!category) return null;
	// console.log('category', category);
	return (
		<div
			className='item flex justify-center bg-gray-50 py-2 rounded-r'
			style={{ borderRight: `8px solid ${category.color ?? '#e5e5e5'}` }}
		>
			<button className='px-3' onClick={handler}>
				<MdDeleteForever
					data-id={category._id ?? ''}
					color={category.color ?? '#e5e5e5'}
					name='trash'
				/>
			</button>
			<span className='block w-full'>{category.name ?? ''}</span>
		</div>
	);
}

export default List;
