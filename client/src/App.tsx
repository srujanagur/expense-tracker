import React from 'react';
import Graph from './components/Graph';
import Form from './components/Form';
import './App.css';

function App() {
	return (
		<div className='App'>
			<div className='container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800'>
				<div className='bg-slate-800 py-1 mb-10'>
					<h1 className='text-4xl py-1 mb-2 bg-slate-800 text-white rounded'>
						Expense Tracker
					</h1>
					<span className='text-xl  mb-2 bg-slate-800 text-white rounded'>
						Spend wisely
					</span>
				</div>
				{/* grid columns */}
				<div className='grid md:grid-cols-2 gap-4'>
					{/* Chart */}
					<Graph />
					{/* Form */}
					<Form />
				</div>
			</div>
		</div>
	);
}

export default App;
