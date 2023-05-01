import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Typography,
	styled,
	FormControlLabel,
	RadioGroup,
	Radio,
	Stack,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { TypographyInfo } from './index';
import useGetPrice from '../../hooks/useGetPrice';
import { useParams } from 'react-router';
import {
	tokenContract,
	contractForToken,
	reflectContract,
	NameWrapperContract,
	contractForDec,
} from '../../config/contract';
import {
	ensHashName,
	formatUnitsWitheDecimals,
	isSubdomainRegx,
	splitEth,
} from '../../utils';
import {
	useContract,
	useProvider,
	useFeeData,
	useContractRead,
	useBalance,
	useAccount,
} from 'wagmi';
import { NameWrapper, subdomainABI } from '../../config/ABI';
import useApprove from '../../hooks/useApprove';
import useWriteApprove from '../../hooks/useWriteApprove';
import { parseUnitsWithDecimals } from '../../utils';

const TypographyDes = styled(Typography)(({ theme, sx }) => ({
	color: theme.color.mentionColor,
	fontSize: '14px',
	marginBottom: '10px',
	...sx,
}));

const Radio999 = styled(Radio)(({ theme }) => ({
	color: theme.color.mentionColor,
}));

const StyledFormControlLabel = styled((props) => (
	<Box
		sx={{
			border: '2px solid #999',
			borderRadius: '10px',
			mr: '10px',
			pl: '10px',
			background: `${
				props.checked ? 'rgba(47, 115, 218, 0.1);' : 'transparent'
			}`,
		}}
	>
		<FormControlLabel {...props} />
	</Box>
))(({ checked }) => ({
	'.MuiFormControlLabel-label': {
		backgroundColor: 'trasparent',
		color: checked ? '#333' : '#999',
	},
}));

const StepOne = ({
	domainInfo = {},
	dispatch,
	prepareSuccess = false,
	onConfirm,
	refetch,
}) => {
	const params = useParams();
	const { address } = useAccount();
	const [checked, setChecked] = useState('usdt');
	const { data: ethBalance } = useBalance({
		address: address,
	});
	const [fee, setFee] = useState(0);

	const { isApprove, setIsApprove, readLoading } = useApprove([
		tokenContract['USDT'],
	]);
	const { approve, loading } = useWriteApprove({
		tokenAddress: tokenContract['USDT'],
		onSuccess: () => {
			setIsApprove(true);
		},
	});

	const provider = useProvider();
	const contract = useContract({
		address: reflectContract,
		abi: subdomainABI,
		signerOrProvider: provider,
	});

	const childDomain = useMemo(
		() => params?.name.split('-')?.[0] || '',
		[params.name]
	);
	const fatherDomain = useMemo(
		() => params?.name.split('-')[1] || '',
		[params.name]
	);

	const { data: domainOwnerAddress } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'ownerOf',
		args: [ensHashName(domainInfo?.makeUpFullDomain)],
	});

	const isRightDomain = useMemo(
		() => isSubdomainRegx(domainInfo?.makeUpFullDomain),
		[domainInfo]
	);

	const isInsufficient = useMemo(
		() => Number(ethBalance?.formatted || 0) <= 0,
		[ethBalance]
	);

	const domainHasOwner = useMemo(
		() => domainOwnerAddress !== '0x0000000000000000000000000000000000000000',
		[domainOwnerAddress]
	);

	const btnDisabled = useMemo(() => {
		return !isRightDomain || readLoading || domainHasOwner || isInsufficient;
	}, [isRightDomain, readLoading, domainHasOwner, isInsufficient]);

	const { data: gasPrice } = useFeeData();

	const estFee = useMemo(() => {
		if (!gasPrice) return 0;
		const {
			formatted: { gasPrice: price },
		} = gasPrice;
		const mul = price * fee;
		return mul > 0 ? formatUnitsWitheDecimals(mul.toString(), 18) : 0;
	}, [fee, gasPrice]);

	const pricesArray = useGetPrice(fatherDomain, [tokenContract['USDT']]);

	const pricesDisplay = useMemo(() => {
		return (pricesArray ?? []).map((item) => {
			const p = item.prices;
			if (item.mode) {
				const len = childDomain.length;
				return {
					symbol: contractForToken[item.token],
					price:
						len === 3 ? p?.[0] || 10 : item === 4 ? p?.[1] || 10 : p?.[2] || 10,
				};
			} else {
				return {
					symbol: contractForToken[item.token],
					price: formatUnitsWitheDecimals(p?.[0], contractForDec['USDT']) || 10,
				};
			}
		});
	}, [pricesArray, childDomain]);

	const showPriceText = useMemo(() => {
		const checkedObj = pricesDisplay.find(
			(v) => v && v.symbol.toLowerCase() === checked
		);
		return checkedObj?.price || 10;
	}, [checked, pricesDisplay]);

	const changeRadio = useCallback((e) => {
		setChecked(e.target.value);
	}, []);

	const obj = useMemo(
		() => [
			splitEth(fatherDomain),
			childDomain,
			address,
			'0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750',
			0,
			tokenContract['USDT'],
			parseUnitsWithDecimals(Number(showPriceText), contractForDec['USDT']),
		],
		[childDomain, fatherDomain, showPriceText, address]
	);

	const btnLoading = useMemo(
		() => loading || readLoading,
		[loading, readLoading]
	);

	const registerAndPay = useCallback(() => {
		dispatch({ type: 'registerStatus', payload: 'pending' });
		onConfirm?.();
	}, [onConfirm, dispatch]);

	const approveOrPay = useCallback(() => {
		if (!isApprove) {
			approve?.();
		} else {
			// paid
			registerAndPay();
		}
	}, [isApprove, approve, registerAndPay]);

	const getGas = useCallback(async () => {
		try {
			const estimateGas = await contract.estimateGas.registerSubdomain(...obj, {
				from: address,
			});
			setFee(estimateGas.toString());
		} catch (error) {
			console.log(error, 'gas');
		}
	}, [contract, obj, address]);

	useEffect(() => {
		if (prepareSuccess) {
			getGas();
		}
	}, [getGas, prepareSuccess]);

	useEffect(() => {
		if (obj) {
			dispatch({ type: 'registerArray', payload: obj });
		}
	}, [obj, dispatch]);

	useEffect(() => {
		if (isApprove && !onConfirm) {
			refetch?.();
		}
	}, [isApprove, onConfirm, refetch]);

	return (
		<>
			<TypographyInfo sx={{ mb: '10px' }}>Supported Tokens:</TypographyInfo>
			<RadioGroup row onChange={changeRadio}>
				{pricesDisplay.map((item) => (
					<StyledFormControlLabel
						key={item.symbol}
						value="usdt"
						label={`${item.price} ${item.symbol}`}
						checked={checked === item.symbol.toLowerCase()}
						control={<Radio999 />}
					/>
				))}
			</RadioGroup>
			<TypographyDes sx={{ mt: '30px' }}>
				-Registration fee:{showPriceText} {checked?.toUpperCase()}
			</TypographyDes>
			<TypographyDes>-Est.network fee:{estFee}ETH </TypographyDes>
			<TypographyDes>
				-Estimated total:
				{estFee} ETH + {showPriceText}
				{checked?.toUpperCase()}
			</TypographyDes>
			<TypographyDes sx={{ mb: '30px' }}>
				-2.5%service fees is included
			</TypographyDes>

			{domainHasOwner ? (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={(theme) => ({ mb: theme.spacing(2) })}
				>
					<TypographyInfo
						sx={(theme) => ({
							color: theme.color.success,
							fontWeight: 800,
							mr: theme.spacing(1),
						})}
					>
						Paid
					</TypographyInfo>
					<CheckCircleRoundedIcon
						sx={(theme) => ({
							color: theme.color.success,
							fontSize: '15px',
						})}
					/>
				</Stack>
			) : (
				<LoadingButton
					disabled={btnDisabled}
					variant="contained"
					onClick={approveOrPay}
					loading={btnLoading}
				>
					{isInsufficient
						? 'Insufficient Funds'
						: isApprove
						? `pay ${showPriceText} ${checked} & Register`
						: 'Approve'}
				</LoadingButton>
			)}
		</>
	);
};

export default memo(StepOne);
