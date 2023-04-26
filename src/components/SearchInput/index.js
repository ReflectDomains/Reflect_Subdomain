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
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { isSubdomainRegx, throttle } from '../../utils';

const SearchWrapper = styled(Box)(() => ({
	width: '600px',
}));

const Search = styled(Input)(({ theme }) => ({
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

/** TODO:
 *
 */

const SearchInput = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const [isFocus, setFocus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [test, setTest] = useState(null);

	const handleChange = useCallback(
		(e) => {
			setIsLoading(true);
			const value = e.target.value;
			setSearchValue(value);
			console.log(12, test);
			test?.fn();
		},
		[test]
	);

	const validName = useMemo(() => {
		return isSubdomainRegx(searchValue);
	}, [searchValue]);

	const clearSearchValue = useCallback(() => {
		setSearchValue('');
	}, []);

	const callFn = useCallback(() => {
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const fn = throttle(callFn, 500);
		setTest({ fn: fn });
	}, [callFn]);

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

			<Collapse in={isFocus && searchValue.length > 3}>
				<PopoverList>
					<PopoverListItem
						valid={validName.toString()}
						onClick={() => {
							if (validName) {
								navigate(`/register/${searchValue}`);
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
										<RegisterStatus status="Available">
											Available
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
