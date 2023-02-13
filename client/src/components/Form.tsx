import React from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { apiSlice } from '../redux/apiSlice';
import { Labels } from '../types';

const Form = () => {
	const { register, handleSubmit, resetField } = useForm();
	const [newTransaction] = apiSlice.useNewTransactionMutation();
	const onSubmit = async (data: any) => {
		if (!data) return {};
		await newTransaction(data).unwrap();
		resetField('name');
		resetField('amount');
	};
	return (
		<div className='form max-w-sm mx-auto w-96'>
			<h1 className='font-bold pb-4 text-xl'>Transaction</h1>
			<form id='form' onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-4'>
					<select className='form-input' {...register('type')}>
						<option value='Expense'>Expense</option>
						<option value='Savings'>Savings</option>
						<option value='Investment'>Investment</option>
					</select>
					<div className='input-group'>
						<input
							{...register('name')}
							type='text'
							placeholder='Salary, Rent, SIP'
							className='form-input'
						/>
					</div>
					<div className='input-group'>
						<input
							type='text'
							placeholder='Amount'
							className='form-input'
							{...register('amount')}
						/>
					</div>
					<div className='submit-btn'>
						<button className='border py-2 text-white bg-slate-600 w-full'>
							Save Transaction
						</button>
					</div>
				</div>
			</form>
			<List />
		</div>
	);
};

export default Form;
