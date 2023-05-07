import { Box, MenuItem, Select, Stack, styled } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { useCallback, useEffect, useState } from 'react';
import SwitchButton from './SwitchButton';
import LineBarChart from './LineBarChart';
import TransactionTable from './TransactionTable';
import {
	buyChart,
	buyList,
	earnChart,
	earnList,
	overview,
} from '../../../api/profile';
import moment from 'moment';

const StatisticsWrapper = styled(Box)(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gap: theme.spacing(1),
}));

const DateSelect = styled(Select)(({ theme }) => ({
	height: '40px',
	borderRadius: theme.spacing(1),
	borderColor: '1px solid #0000001A',
	fontSize: '14px',
	'&:hover .MuiOutlinedInput-notchedOutline': {
		borderColor: '#0000001A',
	},
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		border: '1px solid #0000001A',
	},
}));

const dates = [
	{ period: 'weekly', text: 'Week' },
	{ period: 'monthly', text: 'Month' },
];

const Portfolio = () => {
	const [switchValue, setSwitchValue] = useState('domain');
	const [times, setTimes] = useState('weekly');

	const [earnData, setEarnData] = useState({});
	const [buyData, setBuyData] = useState({});
	const [earnChartData, setEarnChartData] = useState([]);
	const [buyChartData, setBuyChartData] = useState([]);
	const [overviewData, setOverviewData] = useState();

	const handleSwitch = useCallback((value) => {
		setSwitchValue(value);
	}, []);

	const handleChangeDate = useCallback((event) => {
		setTimes(event.target.value);
	}, []);

	const getEarnChart = useCallback(async () => {
		console.log('times:', times);
		const resp = await earnChart({ period: times });
		if (resp?.code === 0 && resp?.data?.chart) {
			setEarnChartData(resp?.data?.chart);
		}
	}, [times]);

	const getBuyChart = useCallback(async () => {
		const resp = await buyChart({ period: times });
		if (resp?.code === 0 && resp?.data?.chart) {
			setBuyChartData(resp?.data?.chart);
		}
	}, [times]);

	const getEarnListData = useCallback(async (reqParams) => {
		const resp = await earnList(reqParams);
		if (resp?.code === 0 && resp?.data && resp?.data.ens_domains) {
			setEarnData(resp.data.ens_domains);
		}
	}, []);

	const getBuyListData = useCallback(async (reqParams) => {
		const resp = await buyList(reqParams);
		if (resp?.code === 0 && resp?.data && resp?.data.ens_domains) {
			setBuyData(resp.data.ens_domains);
		}
	}, []);

	const getOverview = useCallback(async () => {
		const resp = await overview();
		if (resp?.code === 0 && resp?.data) {
			setOverviewData(resp.data);
		}
	}, []);

	useEffect(() => {
		const reqParams = {
			start_time: moment().subtract(2, 'years'),
			end_time: moment(),
		};
		getEarnListData(reqParams);
		getBuyListData(reqParams);
		getOverview();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getEarnChart();
		getBuyChart();
	}, [getEarnChart, getBuyChart]);

	return (
		<>
			<StatisticsWrapper mt={2}>
				<StatisticsCard type="domain" data={overviewData} />
				<StatisticsCard type="subdomain" data={overviewData} />
			</StatisticsWrapper>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={3}
			>
				<SwitchButton value={switchValue} onChange={handleSwitch} />

				<DateSelect
					labelId="demo-select-small"
					id="demo-select-small"
					value={times}
					onChange={handleChangeDate}
				>
					{dates.map((item) => (
						<MenuItem
							key={item.period}
							value={item.period}
							sx={{ fontSize: '14px' }}
						>
							{item.text}
						</MenuItem>
					))}
				</DateSelect>
			</Stack>

			<LineBarChart
				data={switchValue === 'domain' ? earnChartData : buyChartData}
				type={times}
			/>
			<TransactionTable data={switchValue === 'domain' ? earnData : buyData} />
		</>
	);
};

export default Portfolio;
