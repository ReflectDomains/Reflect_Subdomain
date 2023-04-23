import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
	NameWrapperContract,
	proxyContract,
	reflectContract,
} from '../../config/contract';
import { useAccount, useContractRead } from 'wagmi';
import useWriteContract from '../../hooks/useWriteContract';
import { LoadingButton } from '@mui/lab';
import { NameWrapper } from '../../config/ABI';
import moment from 'moment';
import { ensHashName } from '../../utils';

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

	const { data: ensData } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'getData',
		args: [ensHashName(params?.address)],
	});

	const expiration = useMemo(
		() =>
			moment((ensData?.expiry?.toNumber() ?? 0) * 1000).format(
				'YYYY-MM-DD HH:mm'
			),
		[ensData]
	);

	// check account is set approval for all
	const { data: isApprovedForAll } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'isApprovedForAll',
		args: [address, proxyContract],
	});

	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'setApprovalForAll',
		contractAddress: NameWrapperContract,
		ABIJSON: NameWrapper,
		args: [proxyContract, true],
	});

	const approveToEns = useCallback(() => {
		write?.();
	}, [write]);

	return (
		<Box>
			<StepsWrapper>
				<Box sx={{ width: '400px' }}>
					<Title>{params?.address ?? ''}</Title>

					<Des>REGISTRANT: {address}</Des>
					<Des>CONTROLLER: {reflectContract}</Des>
					<Des>EXPIRATION DATE: {expiration} (UTC)</Des>

					{isSuccess || isApprovedForAll ? (
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
						handleStep(0);
					}}
				>
					Back
				</Button>
				<Button
					variant="contained"
					disabled={!isSuccess && !isApprovedForAll}
					onClick={() => {
						handleStep(2, params?.address);
					}}
				>
					Next
				</Button>
			</Stack>
		</Box>
	);
};

export default memo(StepTwo);
