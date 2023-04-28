import {
	Box,
	CircularProgress,
	Collapse,
	Input,
	List,
	ListItem,
	Stack,
	Typography,
	styled,
} from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { addENSNameSuffix, ensHashName } from '../../utils';
import { useAccount, useContractRead } from 'wagmi';
import { NameWrapper } from '../../config/ABI';
import { NameWrapperContract } from '../../config/contract';
import { isValidName } from 'ethers/lib/utils.js';

const SearchWrapper = styled(Box)(() => ({
	width: '400px',
	margin: '0 auto',
}));

const Search = styled(Input)(({ theme }) => ({
	width: '100%',
	height: '44px',
	border: 'none',
	background: '#fff',
	borderRadius: theme.spacing(1),
	marginTop: '80px',

	':hover,': {
		border: 'none',
	},

	'&.Mui-focused': {
		border: 'none',
	},
}));

const ClearButton = styled(CloseIcon)(() => ({
	fontSize: '24px',
	cursor: 'pointer',
}));

const PopoverList = styled(List)(({ theme }) => ({
	background: '#fff',
	borderRadius: theme.spacing(1),
	marginTop: theme.spacing(1),
}));

const PopoverListItem = styled(ListItem)(({ theme, ...props }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	cursor: 'pointer',
	...(props.invalid === 'true' && {
		border: `1px solid ${theme.color.error}`,
		backgroundColor: theme.color.error + '1a',
		'.MuiTypography-root': {
			color: theme.color.error,
		},
		':hover': {
			border: `1px solid ${theme.color.error}1a`,
			backgroundColor: theme.color.error + '1a',
		},
	}),
}));

const ListItemTitle = styled(Typography)(() => ({
	fontWeight: 800,
}));

const RegisterStatus = styled(Box)(({ theme, ...props }) => ({
	borderRadius: '50px',
	backgroundColor:
		props.status === 'Available'
			? theme.color.success + '1a'
			: theme.color.error + '1a',

	color: props.status === 'Available' ? theme.color.success : theme.color.error,
	padding: theme.spacing(0.5, 1),
	fontSize: '14px',
	fontWeight: 700,
}));

const StepOne = ({ handleStep }) => {
	const { address } = useAccount();
	const [searchValue, setSearchValue] = useState('');
	const [isFocus, setFocus] = useState(false);

	const { data: ensData, isLoading } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'getData',
		args:
			searchValue.length >= 3 && isValidName(searchValue.replace(/ /g, ''))
				? [ensHashName(addENSNameSuffix(searchValue))]
				: null,
		enabled: searchValue.length >= 3,
		onSettled(data, error) {
			console.log('Settled', { data, error });
		},
	});

	const invalidName = useMemo(() => {
		return !isValidName(searchValue.replace(/ /g, ''));
	}, [searchValue]);

	const judgeOwnerStatus = useCallback(() => {
		return ensData?.owner === address ? 'Available' : 'nonOwner';
	}, [ensData, address]);

	const handleChange = useCallback((e) => {
		const value = e.target.value;
		setSearchValue(value);
	}, []);

	const clearSearchValue = useCallback(() => {
		setSearchValue('');
	}, []);

	return (
		<SearchWrapper>
			<Search
				value={searchValue}
				placeholder="Search for a subname of ENS"
				disableUnderline={true}
				startAdornment={<SearchIcon sx={{ marginRight: '10px' }} />}
				endAdornment={
					searchValue ? (
						<ClearButton
							onClick={() => {
								clearSearchValue();
							}}
						/>
					) : null
				}
				onChange={handleChange}
				onFocus={() => {
					setFocus(true);
				}}
				onBlur={() => {
					setTimeout(() => {
						setFocus(false);
					}, [200]);
				}}
			/>

			<Collapse in={isFocus && searchValue.length >= 3}>
				<PopoverList>
					<PopoverListItem
						invalid={invalidName.toString()}
						onClick={() => {
							if (judgeOwnerStatus() === 'Available') {
								handleStep(1, addENSNameSuffix(searchValue));
							}
						}}
					>
						{!invalidName ? (
							<>
								<ListItemTitle>{addENSNameSuffix(searchValue)}</ListItemTitle>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="center"
									spacing={1}
								>
									{!isLoading ? (
										<RegisterStatus status={judgeOwnerStatus()}>
											{judgeOwnerStatus()}
										</RegisterStatus>
									) : (
										<CircularProgress size={14} thickness={7} />
									)}
									<ChevronRightIcon
										sx={(theme) => ({ color: theme.color.mentionColor })}
									/>
								</Stack>
							</>
						) : (
							<ListItemTitle>Invalid format for name</ListItemTitle>
						)}
					</PopoverListItem>
				</PopoverList>
			</Collapse>
		</SearchWrapper>
	);
};

export default memo(StepOne);
