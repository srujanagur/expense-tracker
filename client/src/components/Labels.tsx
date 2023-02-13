/* eslint-disable react/prop-types */
import React from 'react';
import { apiSlice } from '../redux/apiSlice';
import { getLabels } from './helper';

const Labels = () => {
	const { data, isFetching, isSuccess, isError } = apiSlice.useGetLabelsQuery();
	let Transactions;
	if (isFetching) {
		Transactions = <div>Fetching</div>;
	} else if (isSuccess) {
		Transactions = getLabels(data, 'type').map((v, i) => (
			<LabelComponent key={i} data={v} />
		));
	} else if (isError) {
		Transactions = <div>Error</div>;
	}
	return <>{Transactions}</>;
};

function LabelComponent({ data }: any) {
	if (!data) return <></>;
	// console.log('data', data);
	return (
		<div className='labels flex justify-between'>
			<div className='flex gap-2'>
				<div
					className='w-2 h-2 rounded py-3'
					style={{ background: data.color ?? '#f9c74f' }}
				></div>
				<h3 className='text-md'>{data.type ?? ''}</h3>
			</div>
			<h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
		</div>
	);
}

export default Labels;
