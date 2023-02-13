import _ from 'lodash';

export function getSum(transaction: any, type?: string) {
	const sum = _(transaction)
		.groupBy('type')
		.map((objs, key) => {
			if (!type) return _.sumBy(objs, 'amount'); // [300, 350, 500]
			return {
				type: key,
				color: objs[0].color,
				total: _.sumBy(objs, 'amount'),
			};
		})
		.value();
	return sum;
}

export function getLabels(transaction: any, type?: string) {
	const amountSum = getSum(transaction, 'type');
	const Total = _.sum(getSum(transaction));
	const percent = _(amountSum)
		.map((objs: any) => _.assign(objs, { percent: (100 * objs.total) / Total }))
		.value();
	return percent;
}

export function chart_Data(transaction: any, custom?: any) {
	let bg = _.map(transaction, (a) => a.color);
	bg = _.uniq(bg);
	const dataValue = getSum(transaction);
	const config = {
		data: {
			datasets: [
				{
					data: dataValue,
					backgroundColor: bg,
					hoverOffset: 4,
					borderRadius: 10,
					spacing: 0,
				},
			],
		},
		options: {
			cutout: 115,
		},
	};
	return custom ?? config;
}
export function getTotal(transaction: any) {
	return _.sum(getSum(transaction));
}
