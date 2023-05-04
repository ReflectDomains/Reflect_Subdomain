import { Box, MenuItem, Select, Stack, styled } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { useCallback, useEffect, useState } from 'react';
import SwitchButton from './SwitchButton';
import LineBarChart from './LineBarChart';
import TransactionTable from './TransactionTable';
import { buyChat, earnChat, getProfile, overview } from '../../../api/profile';
import moment from 'moment';
import { useDispatch } from 'react-redux';

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

const dates = ['ALL', 'Day', 'Week', 'Month'];

const Portfolio = () => {
	const [switchValue, setSwitchValue] = useState('domain');
	const dispatch = useDispatch();
	const [times, setTimes] = useState('Day');

	const [earnData, setEarnData] = useState({});
	const [buyData, setBuyData] = useState({});
	const [overviewData, setOverviewData] = useState();

	console.log('earnData:', earnData);
	console.log('buyData:', buyData);

	const handleSwitch = useCallback((value) => {
		setSwitchValue(value);
	}, []);

	const handleChangeDate = useCallback((event) => {
		setTimes(event.target.value);
	}, []);

	const getEarnChartData = useCallback(async () => {
		const reqParams = {
			start_time: moment().subtract(2, 'years'),
			end_time: moment(),
		};
		const resp = await earnChat(reqParams);
		if (resp?.code === 0 && resp?.data && resp?.data.ens_domains) {
			setEarnData(resp.data.ens_domains);
		}
	}, []);

	const getBuyChartData = useCallback(async () => {
		const reqParams = {
			start_time: moment().subtract(2, 'years'),
			end_time: moment(),
		};
		const resp = await buyChat(reqParams);
		if (resp?.code === 0 && resp?.data && resp?.data.ens_domains) {
			setBuyData(resp.data.ens_domains);
		}
	}, []);

	const getProfileData = useCallback(async () => {
		const resp = await getProfile();
		if (resp?.code === 0 && resp?.data) {
			dispatch({ type: 'SET_PROFILE', action: resp.data });
		}
	}, [dispatch]);

	const getOverview = useCallback(async () => {
		const resp = await overview();
		if (resp?.code === 0 && resp?.data) {
			setOverviewData(resp.data);
		}
	}, []);

	useEffect(() => {
		getEarnChartData();
		getBuyChartData();
		getOverview();
		getProfileData();
		// eslint-disable-next-line
	}, []);

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
						<MenuItem key={item} value={item} sx={{ fontSize: '14px' }}>
							{item}
						</MenuItem>
					))}
				</DateSelect>
			</Stack>

			<LineBarChart />
			<TransactionTable data={switchValue === 'domain' ? earnData : buyData} />
		</>
	);
};

export default Portfolio;
