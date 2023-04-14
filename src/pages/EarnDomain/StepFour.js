import { Box, Button, Link, Stack, Typography, styled } from '@mui/material';
import { memo, useState } from 'react';
import { Discord, Twitter } from '../../assets';
import { useNavigate } from 'react-router-dom';

const StepsWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	minHeight: '300px',
	background: '#F6F6F6',
	marginTop: theme.spacing(2),
	borderRadius: theme.spacing(1),
	padding: theme.spacing(2),
}));

const Title = styled(Box)(() => ({
	fontSize: '26px',
	fontWeight: 800,
	marginBottom: '20px',
	textAlign: 'center',
	span: {
		transform: 'matrix(-1, 0, 0, 1, 0, 0)',
	},
}));

const Des = styled(Typography)(() => ({
	fontSize: '12px',
	marginTop: '10px',
	textAlign: 'center',
}));

const LinkButton = styled(Link)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	gap: theme.spacing(1),
}));

const StepFour = ({ handleStep }) => {
	const navigate = useNavigate();

	return (
		<Box>
			<StepsWrapper>
				<Box sx={{ width: '400px' }}>
					<Stack direction="row" justifyContent="center" spacing={1}>
						<Title>🎉</Title>
						<Title>Complete</Title>
						<Title sx={{ transform: 'scaleX(-1)' }}>🎉</Title>
					</Stack>

					<Des>
						Congratulations,you have completed your domain name subname sale
						setup and can now share the information on social media and manage
						your domain name subname sale settings.
					</Des>
					<Stack direction="row" mt={5} justifyContent="center" spacing={4}>
						<LinkButton component="button" underline="none">
							<Discord />
							Discord
						</LinkButton>

						<LinkButton component="button" underline="none">
							<Twitter />
							Twitter
						</LinkButton>
					</Stack>
				</Box>
			</StepsWrapper>

			<Stack direction="row" justifyContent="center" spacing={2} mt={2}>
				<Button
					variant="outlined"
					onClick={() => {
						navigate('/profile');
					}}
				>
					View my Domains
				</Button>
			</Stack>
		</Box>
	);
};

export default memo(StepFour);
