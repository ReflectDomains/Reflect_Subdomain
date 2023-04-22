import { Box, Stack, styled, Button } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import ManageDomain from '../../components/ManageDomain';
import useWriteContract from '../../hooks/useWriteContract';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

const StepsWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
	minHeight: '300px',
	background: '#F6F6F6',
	marginTop: theme.spacing(2),
	borderRadius: theme.spacing(1),
	padding: theme.spacing(2),
}));

const StepThree = ({ handleStep }) => {
	const params = useParams();
	const { address } = useAccount();
	const [priceArray, setPriceArray] = useState([]);
	const labelStrig = useMemo(() => params?.address.split('.')[0], [params]);
	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'openRegister',
		args: [labelStrig, address, priceArray],
		enabled: priceArray.length > 0,
	});
	const confirmSetting = useCallback(
		(priceArray) => {
			setPriceArray(priceArray);
			if (write) {
				write();
			}
		},
		[write]
	);
	return (
		<Box>
			<StepsWrapper>
				<ManageDomain
					onClick={confirmSetting}
					loading={isLoading}
					isSuccess={isSuccess}
				/>
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
					onClick={() => {
						handleStep(2);
					}}
				>
					Next
				</Button>
			</Stack>
		</Box>
	);
};

export default memo(StepThree);
