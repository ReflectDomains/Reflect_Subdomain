import {
	Accordion,
	Box,
	Button,
	AccordionSummary,
	Input,
	Stack,
	Typography,
	AccordionDetails,
	styled,
} from '@mui/material';
import { memo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageDomain from '../../../components/ManageDomain';

const Title = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
	fontWeight: 800,
}));

const ExpiryDate = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
}));

const list = [
	{
		name: 'Jassen.eth',
		type: 'Management',
		digit: true,
		tokens: {
			USDT: true,
			USDC: false,
			ETH: false,
			DAI: false,
		},
	},
	{
		name: 'meta.eth',
		type: 'earn',
		digit: false,
		tokens: {
			USDT: true,
			USDC: false,
			ETH: false,
			DAI: false,
		},
	},
	{
		name: 'hash.eth',
		type: 'Management',
		digit: false,
		tokens: {
			USDT: true,
			USDC: false,
			ETH: false,
			DAI: false,
		},
	},
];

const Domains = () => {
	const [expanded, setExpanded] = useState('panel0');

	const [domainList] = useState(list);

	const handleChange = (type, panel) => (event, isExpanded) => {
		if (type === 'Management') {
			setExpanded(isExpanded ? panel : false);
		}
	};
	return (
		<>
			{/* Search Input */}
			<Box
				sx={(theme) => ({
					marginTop: theme.spacing(2),
					textAlign: 'right',
				})}
			>
				<Input
					variant="filled"
					disableUnderline={true}
					placeholder="Search for subdomain"
					endAdornment={
						<Button
							sx={{
								padding: '5px',
								minWidth: 'unset',
								height: 'unset',
								background: 'white',
							}}
						>
							<SearchIcon
								sx={(theme) => ({ color: theme.palette.primary.main })}
							/>
						</Button>
					}
				/>
			</Box>

			{/* domain list */}
			<Stack spacing={1} pt={2}>
				{domainList.map((item, index) => (
					<Accordion
						key={index}
						expanded={
							expanded === `panel${index}` && item.type === 'Management'
						}
						onChange={handleChange(item.type, `panel${index}`)}
					>
						<AccordionSummary
							expandIcon={
								expanded === `panel${index}` ? (
									<ExpandMoreIcon />
								) : (
									<Button
										sx={(theme) => ({
											color: theme.palette.primary.main,
											background: 'transparent',
										})}
									>
										{item.type === 'Management' ? 'Management' : 'Earn'}
									</Button>
								)
							}
							aria-controls={`panel${index}-controls`}
							id={`panel${index}-header`}
							sx={(theme) => ({
								'& .MuiAccordionSummary-content': {
									display: 'flex',
									gap: '100px',
									alignItems: 'center',
									justifyContent: 'flex-start',
									transition: 'all 0.3s',
								},
								'& .MuiAccordionSummary-content.Mui-expanded': {
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: theme.spacing(1),
									paddingTop: '40px',
									transition: 'font 0.3s ease',
									'.title': {
										transition: 'font 0.3s ease',
										fontSize: '26px !important',
									},
									'.des': { color: theme.typography.subtitle1.color },
								},
							})}
						>
							<Title className="title">reflect.eth</Title>
							<ExpiryDate className="des">
								Expiry: 2025.02.21(XX days)
							</ExpiryDate>
						</AccordionSummary>

						<AccordionDetails
							sx={(theme) => ({
								paddingTop: theme.spacing(5),
								display: 'flex',
								flexDirection: 'column',
								gap: theme.spacing(2),
							})}
						>
							<ManageDomain
								defaultValue={[]}
								onClick={() => {}}
								onChange={() => {}}
								onChangeReceiving={() => {}}
								loading={false}
								isSuccess={false}
							/>
						</AccordionDetails>
					</Accordion>
				))}
			</Stack>
		</>
	);
};

export default memo(Domains);
