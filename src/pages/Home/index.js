import { Button, Stack, Typography, styled } from '@mui/material';
import { MentionIcon } from '../../assets';
import PopularDomainCard from './PopularDomainCard';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { popularList } from '../../api/subdomain';

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

	const [popularArr, setPopularArr] = useState([]);

	const getPopularList = async () => {
		const resp = await popularList();
		if (resp?.code === 0 && resp?.data?.ens_domains) {
			setPopularArr(resp?.data?.ens_domains);
		}
	};

	useEffect(() => {
		getPopularList();
	}, []);

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
				{popularArr.map((item, index) => (
					<PopularDomainCard
						key={index}
						info={item}
						cup={
							index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''
						}
					/>
				))}
			</Stack>
		</>
	);
};

export default Home;
