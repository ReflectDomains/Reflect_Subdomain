import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { reflectContract } from '../../config/contract';
import { useAccount } from 'wagmi';

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

const Title = styled(Typography)(() => ({
	fontWeight: 800,
	marginBottom: '20px',
}));

const Des = styled(Typography)(() => ({
	fontSize: '12px',
	marginTop: '10px',
}));

const SuccessDes = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
	color: theme.color.success,
	textAlign: 'center',
	marginTop: '55px',
}));

const StepTwo = ({ handleStep }) => {
	const [update, setUpdate] = useState(false);
	const { address } = useAccount();
	const params = useParams();

	return (
		<Box>
			<StepsWrapper>
				<Box sx={{ width: '400px' }}>
					<Title>{params?.address ?? ''}</Title>

					<Des>REGISTRANT: {address}</Des>
					<Des>CONTROLLER: {reflectContract}</Des>
					<Des>EXPIRATION DATE: 2024.04.14 at 04:58 (UTC)</Des>

					{update ? (
						<SuccessDes>Update operator successful</SuccessDes>
					) : (
						<Button
							variant="contained"
							sx={{ marginTop: '40px' }}
							onClick={() => {
								setUpdate(true);
							}}
						>
							Update operator to Reflect Contract
						</Button>
					)}
				</Box>
			</StepsWrapper>

			<Stack direction="row" justifyContent="center" spacing={2} mt={2}>
				<Button
					variant="outlined"
					onClick={() => {
						handleStep(1);
					}}
				>
					Back
				</Button>
				<Button
					variant="contained"
					disabled={!update}
					onClick={() => {
						handleStep(3);
					}}
				>
					Next
				</Button>
			</Stack>
		</Box>
	);
};

export default memo(StepTwo);
