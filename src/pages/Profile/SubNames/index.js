import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Box,
	Button,
	Input,
	styled,
	Stack,
	Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { memo, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DelIcon, EditIcon, SetPrimaryNameIcon } from '../../../assets';
import { useENSJS } from '../../../provider/EnsjsProdiver';

const Title = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
	fontWeight: 800,
}));

const ExpiryDate = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: theme.typography.fontSize,
}));

const DomainCard = styled(Box)(({ theme, ...props }) => ({
	display: 'flex',
	justifyContent: 'center',
	gap: theme.spacing(2),
	padding: theme.spacing(1),
	background: props.type === 'parent' ? '#C8E9AF80' : '#C1AFE980',
	borderRadius: theme.spacing(1),
	span: {
		fontSize: '14px',
		fontWeight: 500,
	},
	'.role': {
		fontWeight: 800,
		color: props.type === 'parent' ? '#6A8857' : '#735788',
	},
}));

const SubNames = () => {
	const [expanded, setExpanded] = useState('panel0');

	const { childrenList } = useENSJS();

	const [searchValue, setSearchValue] = useState('');
	const [searchInputTemp, setSearchInputTemp] = useState('');

	const handleChange = (panel) => (_, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleChangeSearchVal = (e) => {
		setSearchInputTemp(e.target.value);
	};

	const filterChildList = useMemo(() => {
		if (!searchValue) {
			return childrenList;
		}
		return childrenList.filter((item) => item.name.indexOf(searchValue) >= 0);
	}, [searchValue, childrenList]);

	const jumpToENSProfile = (name) => {
		window.open(`https://app.ens.domains/${name}`);
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
					value={searchInputTemp}
					disableUnderline={true}
					placeholder="Search for subdomain"
					onChange={handleChangeSearchVal}
					endAdornment={
						<Button
							sx={{
								padding: '5px',
								minWidth: 'unset',
								height: 'unset',
								background: 'white',
							}}
							onClick={() => {
								setSearchValue(searchInputTemp);
							}}
						>
							<SearchIcon
								sx={(theme) => ({ color: theme.palette.primary.main })}
							/>
						</Button>
					}
				/>
			</Box>

			{/* SubNames list */}
			<Stack spacing={1} pt={2}>
				{filterChildList.map((item, index) => (
					<Accordion
						key={index}
						expanded={expanded === `panel${index}`}
						onChange={handleChange(`panel${index}`)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`panel${index}-controls`}
							id={`panel${index}-header`}
							sx={(theme) => ({
								'& .MuiAccordionSummary-content': {
									display: 'flex',
									gap: '100px',
									alignItems: 'center',
									justifyContent: 'flex-start',
									transition: 'all 0.1s linear',
								},
								'& .MuiAccordionSummary-content.Mui-expanded': {
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: theme.spacing(1),
									paddingTop: '40px',
									transition: 'font 0.1s linear',
									'.title': {
										transition: 'font 0.1s linear',
										fontSize: '26px !important',
									},
									'.des': { color: theme.typography.subtitle1.color },
								},
							})}
						>
							<Title className="title">{item.truncatedName}</Title>
							<ExpiryDate className="des">Expiry: {item.expiryDate}</ExpiryDate>
						</AccordionSummary>
						<AccordionDetails
							sx={(theme) => ({
								paddingTop: theme.spacing(6),
							})}
						>
							<Typography sx={{ fontWeight: 600 }}>Ownership</Typography>
							<Stack direction="row" spacing={1} pt={1}>
								<DomainCard type="parent">
									<span className="role">parent</span>
									<span className="name">{item?.parent.name}</span>
								</DomainCard>

								{/* <DomainCard>
									<span className="role">manager</span>
									<span className="name">{item?.parent.name}</span>
								</DomainCard> */}
							</Stack>

							<Divider
								sx={(theme) => ({
									borderBottom: '1px solid #0000001A',
									margin: theme.spacing(2, 0),
								})}
							/>

							<Stack direction="row" justifyContent="space-between">
								<LoadingButton
									startIcon={<DelIcon />}
									sx={{ mr: 1 }}
									onClick={() => {
										jumpToENSProfile(item.truncatedName);
									}}
								>
									Delete subname
								</LoadingButton>
								<Stack direction="row" spacing={0.5}>
									<LoadingButton
										startIcon={<SetPrimaryNameIcon />}
										onClick={() => {
											jumpToENSProfile(item.truncatedName);
										}}
									>
										Set as primary name
									</LoadingButton>
									<LoadingButton
										startIcon={<EditIcon />}
										onClick={() => {
											jumpToENSProfile(item.truncatedName);
										}}
									>
										Edit profile
									</LoadingButton>
									{/* <LoadingButton startIcon={<SellIcon />} variant="contained">
										Sell
									</LoadingButton> */}
								</Stack>
							</Stack>
						</AccordionDetails>
					</Accordion>
				))}
			</Stack>
		</>
	);
};

export default memo(SubNames);
