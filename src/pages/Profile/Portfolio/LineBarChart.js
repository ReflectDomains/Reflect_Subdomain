import ReactEcharts from 'echarts-for-react';
import { memo } from 'react';

const LineBarChart = () => {
	const colors = ['#EE6666', '#5470C6', '#91CC75'];
	const option = {
		color: colors,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		grid: {
			// right: '20%',
			right: '10%',
		},
		legend: {
			data: ['Growth ratio', 'USDT', 'USDC'],
		},
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true,
				},
				// prettier-ignore
				data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			},
		],
		yAxis: [
			{
				type: 'value',
				name: 'Growth ratio',
				position: 'left',
				alignTicks: true,
				axisLine: {
					show: true,
					lineStyle: {
						color: colors[0],
					},
				},
				axisLabel: {
					formatter: '{value}%',
				},
			},
			{
				type: 'value',
				name: 'USDT',
				position: 'right',
				alignTicks: true,
				axisLine: {
					show: true,
					lineStyle: {
						color: colors[1],
					},
				},
				axisLabel: {
					formatter: '{value}$',
				},
			},
			// {
			// 	type: 'value',
			// 	name: 'USDC',
			// 	position: 'right',
			// 	alignTicks: true,
			// 	offset: 80,
			// 	axisLine: {
			// 		show: true,
			// 		lineStyle: {
			// 			color: colors[2],
			// 		},
			// 	},
			// 	axisLabel: {
			// 		formatter: '{value}$',
			// 	},
			// },
		],
		series: [
			{
				name: 'Growth ratio',
				type: 'line',
				yAxisIndex: 0,
				data: [
					2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
				],
			},
			{
				name: 'USDT',
				type: 'bar',
				yAxisIndex: 1,
				data: [
					2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
				],
			},
			// {
			// 	name: 'USDC',
			// 	type: 'bar',
			// 	yAxisIndex: 2,
			// 	data: [
			// 		2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
			// 	],
			// },
		],
	};

	return (
		<ReactEcharts
			option={option}
			style={{ height: '400px', marginTop: '20px' }}
		/>
	);
};

export default memo(LineBarChart);
