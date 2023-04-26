import {
	Box,
	Collapse,
	Input,
	List,
	ListItem,
	Stack,
	Typography,
	styled,
	CircularProgress,
} from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import {
	addENSNameSuffix,
	debounce,
	ensHashName,
	isSubdomainRegx,
	zeroAddress,
} from '../../utils';
import { searchSubdomain } from '../../api/subdomain';
import { useContractRead } from 'wagmi';
import { NameWrapper } from '../../config/ABI';
import { NameWrapperContract } from '../../config/contract';

const SearchWrapper = styled(Box)(() => ({
	width: '600px',
}));

const Search = styled(Input)(() => ({
	width: '100%',
	height: '44px',
	border: 'none',
	background: '#fff',
	borderRadius: '20px',
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
	...(props.valid === 'false' && {
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

const SearchInput = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const [isFocus, setFocus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isHost, setHost] = useState(false);

	const validName = useMemo(() => {
		return isSubdomainRegx(searchValue);
	}, [searchValue]);

	const { data: ensData } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'getData',
		args: validName ? [ensHashName(addENSNameSuffix(searchValue))] : null,
		enabled: validName && isHost,
		cacheOnBlock: true,
		onSettled(data, error) {
			console.log('Settled', { data, error });
		},
		onSuccess(data) {
			console.log('Success', data);
		},
	});

	const judgeOwnerStatus = useCallback(() => {
		return !isHost
			? 'UnSupport'
			: ensData?.owner === zeroAddress
			? 'Available'
			: 'Registered';
	}, [ensData, isHost]);

	// Fix me
	// eslint-disable-next-line
	const handleSearchSubdomain = useCallback(
		debounce(async (value) => {
			setIsLoading(true);
			try {
				const searchTerm = value.split('.')[1];
				if (isSubdomainRegx(value)) {
					const resp = await searchSubdomain({ search_term: searchTerm });
					if (
						resp?.code === 0 &&
						resp?.data?.ens_domains &&
						resp?.data.ens_domains[0]?.domain.includes(searchTerm[1])
					) {
						setHost(true);
					}
				}
			} catch (error) {
				console.error('handleSearchSubdomain:', error);
			} finally {
				setIsLoading(false);
			}
		}, 500),
		[]
	);

	const handleChange = useCallback(
		(e) => {
			setIsLoading(true);
			setHost(false);
			const value = e.target.value;
			setSearchValue(value);
			handleSearchSubdomain(value);
		},
		[handleSearchSubdomain]
	);

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
					if (validName) {
						handleSearchSubdomain(searchValue);
					}
				}}
				onBlur={() => {
					setTimeout(() => {
						setFocus(false);
					}, [200]);
				}}
			/>

			<Collapse in={isFocus && searchValue.length > 3}>
				<PopoverList>
					<PopoverListItem
						valid={validName.toString()}
						onClick={() => {
							if (judgeOwnerStatus() === 'Available') {
								const domainPartList = searchValue.split('.');
								navigate(
									`/register/${domainPartList[0]}-${domainPartList[1]}.eth`
								);
							}
						}}
					>
						{validName ? (
							<>
								<ListItemTitle>{searchValue}</ListItemTitle>
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
							<ListItemTitle>
								Invalid name(eg:your_name.parent.eth)
							</ListItemTitle>
						)}
					</PopoverListItem>
				</PopoverList>
			</Collapse>
		</SearchWrapper>
	);
};

export default memo(SearchInput);
