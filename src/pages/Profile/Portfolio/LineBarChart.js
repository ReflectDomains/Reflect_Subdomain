import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { memo, useCallback, useEffect, useState } from 'react';
import { formatUnitsWitheDecimals } from '../../../utils';

const LineBarChart = ({ data, type }) => {
	const [growthData, setGrowthData] = useState([]);
	const [usdtData, setUSDTData] = useState([]);
	const [xData, setXData] = useState([]);

	const handleData = useCallback(() => {
		let growList = [];
		let usdtList = [];
		let xList = [];
		data.map((item) => {
			xList.push(moment(item.timestamp * 1000).format('MM-DD'));
			growList.push(formatUnitsWitheDecimals(item.amount.toString(), 18));
			usdtList.push(formatUnitsWitheDecimals(item.amount.toString(), 18));
			return item;
		});
		setGrowthData(growList);
		setUSDTData(usdtList);
		setXData(xList);
	}, [data]);

	useEffect(() => {
		handleData();
	}, [handleData]);

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
		dataZoom: [
			{
				type: 'inside',
				throttle: 50,
			},
		],
		xAxis: [
			{
				type: 'category',
				axisTick: {
					alignWithLabel: true,
				},
				// prettier-ignore
				data: type === 'weekly' ? ['Mon','Tues','Wed','Thur','Fri','Sat','Sun'] :xData,
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
				// data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 80, 100],
				data: growthData,
			},
			{
				name: 'USDT',
				type: 'bar',
				yAxisIndex: 1,
				data: usdtData,
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
