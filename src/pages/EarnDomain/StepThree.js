import { Box, Stack, styled, Button } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import ManageDomain from '../../components/ManageDomain';
import useWriteContract from '../../hooks/useWriteContract';
import { useParams } from 'react-router-dom';
import { useAccount, useContractRead } from 'wagmi';
import { subdomainABI } from '../../config/ABI';
import { pricingHash } from '../../utils';
import { reflectContract, tokenContract } from '../../config/contract';
import useGetPrice from '../../hooks/useGetPrice';

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
	const [receivingAddress, setReceivingAddress] = useState('');

	const labelStrig = useMemo(() => params?.address.split('.eth')[0], [params]);

	const prices = useGetPrice(params?.address, [tokenContract['USDT']]);

	const adr = useMemo(
		() => receivingAddress || address,
		[receivingAddress, address]
	);

	const { write, isLoading, isSuccess } = useWriteContract({
		functionName: 'openRegister',
		args: [labelStrig, adr, priceArray],
		enabled: priceArray && priceArray.length > 0,
	});

	const changeReceivingAddress = useCallback((adr) => {
		setReceivingAddress(adr);
	}, []);

	const changePriceList = useCallback((list) => {
		setPriceArray([...list]);
	}, []);

	const confirmSetting = useCallback(() => {
		write?.();
	}, [write]);

	return (
		<Box>
			<StepsWrapper>
				<ManageDomain
					defaultValue={prices || []}
					onClick={confirmSetting}
					onChange={changePriceList}
					onChangeReceiving={changeReceivingAddress}
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
