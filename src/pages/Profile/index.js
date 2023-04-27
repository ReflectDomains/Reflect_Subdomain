import { Box, IconButton, Stack, Tab, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommonPage from '../../components/CommonUI/CommonPage';
import CommonAvatar from '../../components/CommonAvatar';
import SettingsIcon from '@mui/icons-material/Settings';
import { TabContext, TabList } from '@mui/lab';
import { useState } from 'react';
import SubNames from './SubNames';
import Domains from './Domains';
import Portfolio from './Portfolio';
import { useAccount } from 'wagmi';
import { AvatarGenerator } from 'random-avatar-generator';

const ProfileBackground = styled(Box)(({ ...props }) => ({
	width: '100%',
	height: '120px',
	background: `url(${props.img})`,
	borderRadius: '20px',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
}));

const UserBasicInfo = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'flex-end',
	gap: theme.spacing(1),
}));

const Name = styled(Typography)(({ theme }) => ({
	color: theme.typography.caption.color,
	fontSize: '24px',
	fontWeight: 800,
}));

const Bio = styled(Typography)(({ theme }) => ({
	color: theme.typography.subtitle1.color,
	fontSize: '14px',
	fontWeight: 500,
}));

const ProfileTab = styled(Tab)(({ theme }) => ({
	fontWeight: 800,
	color: theme.typography.subtitle1,
}));

const Profile = () => {
	const navigate = useNavigate();
	const { address } = useAccount();

	const generator = new AvatarGenerator();
	let addrAvatar = generator.generateRandomAvatar(address);
	// portfolio | subNames | domains
	const [tabValue, setTabValue] = useState('portfolio');

	const handleChangeTab = (_, newValue) => {
		setTabValue(newValue);
	};

	return (
		<CommonPage title="Profile" sx={(theme) => ({ padding: '0' })}>
			{/* background image */}
			<ProfileBackground img={addrAvatar}>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						background: 'rgba(255, 255, 255, 0.2)',
						backdropFilter: 'blur(20px)',
					}}
				/>
			</ProfileBackground>
			{/* Profile basic info */}
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="flex-end"
				sx={(theme) => ({
					padding: theme.spacing(0, 4),
					position: 'relative',
					top: -40,
				})}
			>
				<UserBasicInfo>
					<CommonAvatar address={address} scope={100} />
					<Box>
						<Name>Jassen</Name>
						<Bio>This is a Web3 Reflect domain</Bio>
					</Box>
				</UserBasicInfo>
				<IconButton
					onClick={() => {
						navigate('/setting');
					}}
				>
					<SettingsIcon
						fontSize="30px"
						sx={(theme) => ({
							color: theme.color.text,
						})}
					/>
				</IconButton>
			</Stack>
			{/* tab */}
			<Box sx={(theme) => ({ padding: theme.spacing(0, 4, 4) })}>
				<TabContext value={tabValue}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList
							onChange={handleChangeTab}
							aria-label="lab API tabs example"
						>
							<ProfileTab
								label="Portfolio"
								value="portfolio"
								sx={(theme) => ({ borderRadius: theme.spacing(2, 0, 0, 0) })}
							/>
							<ProfileTab label="SubNames" value="subNames" />
							<ProfileTab
								label="Domains"
								value="domains"
								sx={(theme) => ({ borderRadius: theme.spacing(0, 2, 0, 0) })}
							/>
						</TabList>
					</Box>
					{tabValue === 'portfolio' && <Portfolio />}
					{tabValue === 'subNames' && <SubNames />}
					{tabValue === 'domains' && <Domains />}
				</TabContext>
			</Box>
		</CommonPage>
	);
};

export default Profile;
