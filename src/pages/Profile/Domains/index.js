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
import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageDomain from '../../../components/ManageDomain';
import { useENSJS } from '../../../provider/EnsjsProdiver';
import moment from 'moment';
import useGetPrice from '../../../hooks/useGetPrice';
import { useAccount } from 'wagmi';
import { tokenContract } from '../../../config/contract';
import { earnDomainsList } from '../../../api/profile';
import { useNavigate } from 'react-router-dom';
import { splitEth } from '../../../utils';
import useWriteContract from '../../../hooks/useWriteContract';
import { LoadingButton } from '@mui/lab';

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
	const [labelStrig, setLabelStrig] = useState('')
	const navigate = useNavigate()


	const getExpiry = useCallback((expiryDate) => {
		const expiryDateFormat = moment(expiryDate).format('YYYY-MM-DD HH:mm');
		const diffDays = moment(expiryDate).diff(moment(), 'days');
		return expiryDateFormat + '(' + diffDays + ' days) ';
	}, []);


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
		if (res.code === 0) {
			const { data: {ens_domains} } = res;
			setEarnList([...ens_domains])
		}
	}, []);

	const [receivingAddress, setReceivingAddress] = useState('');
	const adr = useMemo(
		() => receivingAddress || address,
		[receivingAddress, address]
	);

	const prices = useGetPrice((labelStrig? `${labelStrig}.eth`: ''), [tokenContract['USDT']]);

	const [priceArray, setPriceArray] = useState([]);
	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'openRegister',
		args: [labelStrig, adr, priceArray],
		enabled: priceArray && priceArray.length > 0 && labelStrig,
	});

	const handleChange = (item, panel) => (_, isExpanded) => {
		if (!item.type) return
		if (item.type === 'Management') {
			setLabelStrig(splitEth(item.name))
			setExpanded(isExpanded ? panel : false);
		} else {
			navigate(`/domain/1/${item.name}`)
		}
	};

	const changeReceivingAddress = useCallback((adr) => {
		setReceivingAddress(adr);
	}, []);

	const changePriceList = useCallback((list) => {
		setPriceArray([...list]);
	}, []);

	const confirmSetting = useCallback(() => {
		write?.();
	}, [write]);

	useEffect(() => {
		getAuthorizedList();
	}, [getAuthorizedList]);

	useEffect(() => {
		if (prices) {
			setPriceArray([...prices])
		}
	}, [prices])

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
						onChange={handleChange(item, `panel${index}`)}
					>
						<AccordionSummary
							expandIcon={
								expanded === `panel${index}` ? (
									<ExpandMoreIcon />
								) : (
									<LoadingButton
										sx={(theme) => ({
											color: theme.palette.primary.main,
											background: 'transparent',
										})}
									>
										{item.type}
									</LoadingButton>
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
								defaultValue={prices}
								onClick={confirmSetting}
								onChange={changePriceList}
								onChangeReceiving={changeReceivingAddress}
								loading={isLoading}
								isSuccess={isSuccess}
							/>
						</AccordionDetails>
					</Accordion>
				))}
			</Stack>
		</>
	);
};

export default memo(Domains);
