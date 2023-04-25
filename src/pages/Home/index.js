import { Button, Stack, Typography, styled } from '@mui/material';
import { MentionIcon } from '../../assets';
import PopularDomainCard from './PopularDomainCard';
import { useNavigate } from 'react-router-dom';

const Title = styled(Typography)(() => ({
	fontSize: '36px',
	fontWeight: 800,
	textAlign: 'center',
	marginTop: '20vh',
}));

const HomeButton = styled(Button)(({ theme }) => ({
	minWidth: '300px',
	height: '50px',
}));

const MentionButton = styled(MentionIcon)(() => ({
	cursor: 'pointer',
}));

const PopularDomainsText = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	fontSize: '28px',
	fontWeight: 800,
	marginTop: theme.spacing(14),
}));

const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<Title>One-stop buy,sale,management of your web3 subname of ENS</Title>

			<Stack direction="row" justifyContent="center" spacing={3} mt={6}>
				<HomeButton
					color="black"
					onClick={() => {
						navigate('/search');
					}}
				>
					Buy Subname
				</HomeButton>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
				>
					<HomeButton
						color="black"
						onClick={() => {
							navigate('/domain/0');
						}}
					>
						Earn By Subname
					</HomeButton>
					<MentionButton
						onClick={() => {
							console.log('click mention icon');
						}}
					/>
				</Stack>
			</Stack>

			<PopularDomainsText>🔥 Popular Domain Names</PopularDomainsText>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={5}
			>
				<PopularDomainCard
					avatar={
						'https://i.seadn.io/gcs/files/bab6d943a2eac4918f18943324eb053e.png?auto=format&w=384'
					}
					name="jassen.eth"
					cup={'🥇'}
				/>
				<PopularDomainCard
					avatar={
						'https://i.seadn.io/gcs/files/a215db6bdf7d4e8d89c521e93780087a.png?auto=format&w=384'
					}
					name="meta.eth"
					cup={'🥈'}
				/>
				<PopularDomainCard
					avatar={
						'https://i.seadn.io/gcs/files/1619b033c453fe36c5d9e2ac451379a7.png?auto=format&w=384'
					}
					name="reflect.eth"
					cup={'🥉'}
				/>
				<PopularDomainCard
					avatar={
						'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&w=384'
					}
					name="sns.eth"
				/>
			</Stack>
		</>
	);
};

export default Home;
