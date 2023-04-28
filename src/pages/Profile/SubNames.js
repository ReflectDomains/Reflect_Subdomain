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
import { memo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DelIcon, EditIcon, SetPrimaryNameIcon } from '../../assets';

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

const list = [0, 1, 2, 3];

const SubNames = () => {
	const [expanded, setExpanded] = useState('panel0');

	const handleChange = (panel) => (_, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
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

			{/* SubNames list */}
			<Stack spacing={1} pt={2}>
				{list.map((item, index) => (
					<Accordion
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
							<Title className="title">reflect.metabown.eth</Title>
							<ExpiryDate className="des">
								Expiry: 2025.02.21(XX days)
							</ExpiryDate>
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
									<span className="name">metabowen.eth</span>
								</DomainCard>

								<DomainCard>
									<span className="role">manager</span>
									<span className="name">metabowen.eth</span>
								</DomainCard>
							</Stack>

							<Divider
								sx={(theme) => ({
									borderBottom: '1px solid #0000001A',
									margin: theme.spacing(2, 0),
								})}
							/>

							<Stack direction="row" justifyContent="space-between">
								<LoadingButton startIcon={<DelIcon />} sx={{ mr: 1 }}>
									Delete subname
								</LoadingButton>
								<Stack direction="row" spacing={0.5}>
									<LoadingButton startIcon={<SetPrimaryNameIcon />}>
										Set as primary name
									</LoadingButton>
									<LoadingButton startIcon={<EditIcon />}>
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
