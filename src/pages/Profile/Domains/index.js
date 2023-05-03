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
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageDomain from '../../../components/ManageDomain';
import { useENSJS } from '../../../provider/EnsjsProdiver';
import moment from 'moment';
import useGetPrice from '../../../hooks/useGetPrice';
import { useAccount } from 'wagmi';
import { tokenContract } from '../../../config/contract';
import { earnDomainsList } from '../../../api/profile';

const Title = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
	fontWeight: 800,
}));

const ExpiryDate = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
}));

const Domains = () => {
	const { address } = useAccount();
	const [expanded, setExpanded] = useState();
	const { fatherList } = useENSJS();
	const [searchInputTemp, setSearchInputTemp] = useState('');
	const [searchVal, setSearchVal] = useState('');
	const [earnList, setEarnList] = useState([]);
	console.log(fatherList, 'fatherList');

	const handleChange = (type, panel) => (event, isExpanded) => {
		if (type === 'Management') {
			setExpanded(isExpanded ? panel : false);
		}
	};

	const getExpiry = useCallback((expiryDate) => {
		const expiryDateFormat = moment(expiryDate).format('YYYY-MM-DD HH:mm');
		const diffDays = moment(expiryDate).diff(moment(), 'days');
		return expiryDateFormat + '(' + diffDays + ' days) ';
	}, []);

	const prices = useGetPrice(address, [tokenContract['USDT']]);

	const changeSearchInput = useCallback((e) => {
		setSearchInputTemp(e.target.value);
	}, []);

	const filtersFatherList = useMemo(() => {
		return fatherList.map((item) => {
			if (earnList.indexOf(item.name) >= 0) {
				return { ...item, type: 'Management' };
			} else {
				return { ...item, type: 'Earn' };
			}
		});
	}, [fatherList, earnList]);

	const listMatch = useMemo(() => {
		if (!searchVal) {
			return filtersFatherList;
		}
		return filtersFatherList.filter(
			(item) => item.name.indexOf(searchVal) >= 0
		);
	}, [searchVal, filtersFatherList]);

	const searchDomains = useCallback(() => {
		setSearchVal(searchInputTemp);
	}, [searchInputTemp]);

	// Authorized domain list
	const getAuthorizedList = useCallback(async () => {
		const res = await earnDomainsList({
			start_time: '2023-01-01T00:00:00Z',
			end_time: '2023-05-03T15:30:00Z',
		});
	}, []);

	useEffect(() => {
		getAuthorizedList();
	}, [getAuthorizedList]);

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
					onChange={changeSearchInput}
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
								onClick={searchDomains}
							/>
						</Button>
					}
				/>
			</Box>

			{/* domain list */}
			<Stack spacing={1} pt={2}>
				{listMatch.map((item, index) => (
					<Accordion
						key={index}
						expanded={expanded === `panel${index}`}
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
							<Title className="title">{item.name}</Title>
							<ExpiryDate className="des">
								Expiry: {getExpiry(item.expiryDate)}
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
								defaultValue={prices || []}
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
