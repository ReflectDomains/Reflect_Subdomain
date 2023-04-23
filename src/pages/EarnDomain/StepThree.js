import { Box, Stack, styled, Button } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import ManageDomain from '../../components/ManageDomain';
import useWriteContract from '../../hooks/useWriteContract';
import { useParams } from 'react-router-dom';
import { useAccount, useContractRead } from 'wagmi';
import { subdomainABI } from '../../config/ABI';
import { pricingHash } from '../../utils';
import { reflectContract } from '../../config/contract';

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
	const pricingHashRes = pricingHash(params?.address, '0x80258a9230383763E2A1ECa4B5675b49fdBEECbd')
	console.log(pricingHashRes, 'hash res')

	const { data: prices } = useContractRead({
		abi: subdomainABI,
		address: reflectContract,
		functionName: 'getPricing',
		args: [[pricingHashRes]]
	})
	console.log(prices)

	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'openRegister',
		args: [labelStrig, address, priceArray],
		enabled: priceArray.length > 0,
	});

	const changePriceList = useCallback((list) => {
		setPriceArray([...list])
	}, [])

	const confirmSetting = useCallback(
		() => {
			write?.()
		},
		[write]
	);
	return (
		<Box>
			<StepsWrapper>
				<ManageDomain
					onClick={confirmSetting}
					onChange={changePriceList}
					loading={isLoading}
					isSuccess={isSuccess}
				/>
			</StepsWrapper>

			<Stack direction="row" justifyContent="center" spacing={2} mt={2}>
				<Button
					variant="outlined"
					onClick={() => {
						handleStep(1, params?.address);
					}}
				>
					Back
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						handleStep(3, params?.address);
					}}
				>
					Next
				</Button>
			</Stack>
		</Box>
	);
};

export default memo(StepThree);
