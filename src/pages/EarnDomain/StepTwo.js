import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { reflectContract } from '../../config/contract';
import { useAccount } from 'wagmi';
import useWriteContract from '../../hooks/useWriteContract';
import { LoadingButton } from '@mui/lab';

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
	const { address } = useAccount();
	const params = useParams();
	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'SetApporveAll',
		args: [],
	});

	const approveToEns = useCallback(() => {
		console.log(write, 'w');
		write?.();
	}, [write]);

	return (
		<Box>
			<StepsWrapper>
				<Box sx={{ width: '400px' }}>
					<Title>{params?.address ?? ''}</Title>

					<Des>REGISTRANT: {address}</Des>
					<Des>CONTROLLER: {reflectContract}</Des>
					<Des>EXPIRATION DATE: 2024.04.14 at 04:58 (UTC)</Des>

					{isSuccess ? (
						<SuccessDes>Update operator successful</SuccessDes>
					) : (
						<LoadingButton
							variant="contained"
							sx={{ marginTop: '40px' }}
							onClick={approveToEns}
							loading={isLoading}
							disabled={!write || isLoading}
						>
							Update operator to Reflect Contract
						</LoadingButton>
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
					disabled={!isSuccess}
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
