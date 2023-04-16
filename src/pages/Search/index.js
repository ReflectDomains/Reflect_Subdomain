import { Button, Stack, styled, Typography } from '@mui/material';
import SearchInput from '../../components/SearchInput';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Title = styled(Typography)(() => ({
	fontSize: '36px',
	fontWeight: 800,
	textAlign: 'center',
	marginTop: '20vh',
}));

const Search = () => {
	const navigate = useNavigate();

	return (
		<>
			<Title>One-stop buy,sale,management of your web3 subname of ENS</Title>

			<Stack
				direction="column"
				alignItems="center"
				sx={{
					textAlign: 'center',
					marginTop: '60px',
				}}
			>
				<SearchInput />

				<Button
					variant="outlined"
					startIcon={<ChevronLeftIcon />}
					sx={{ borderRadius: '50px', marginTop: '60px' }}
					onClick={() => {
						navigate(-1);
					}}
				>
					Return
				</Button>
			</Stack>
		</>
	);
};

export default Search;
