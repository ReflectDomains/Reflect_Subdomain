import { Box, MenuItem, Select, Stack, styled } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import { useCallback, useState } from 'react';
import SwitchButton from './SwitchButton';
import LineBarChart from './LineBarChart';

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

	const [times, setTimes] = useState('Day');

	const handleSwitch = useCallback((value) => {
		setSwitchValue(value);
	}, []);

	const handleChangeDate = useCallback((event) => {
		setTimes(event.target.value);
	}, []);

	return (
		<>
			<StatisticsWrapper mt={2}>
				<StatisticsCard type="domain" />
				<StatisticsCard type="subdomain" />
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
		</>
	);
};

export default Portfolio;
