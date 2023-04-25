import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Stack,
	Typography,
	styled,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { TypographyInfo } from './index';
import useGetPrice from '../../hooks/useGetPrice';
import { useParams } from 'react-router';
import {
	tokenContract,
	contractForToken,
	reflectContract,
} from '../../config/contract';
import {
	formatUnitsWitheDecimals,
	isSubdomainRegx,
	splitEth,
} from '../../utils';
import { useContract, useProvider, useFeeData } from 'wagmi';
import { subdomainABI } from '../../config/ABI';
import useApprove from '../../hooks/useApprove';
import useWriteApprove from '../../hooks/useWriteApprove';
import useDomainInfo from '../../hooks/useDomainInfo';

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

const StepOne = ({ onChange }) => {
	const params = useParams();
	const [checked, setChecked] = useState('usdt');
	const [isPaid, setIsPaid] = useState(false);
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
		() => params?.name.split('-')?.[0],
		[params.name]
	);
	const fatherDomain = useMemo(() => params?.name.split('-')[1], [params.name]);

	// todo check domain is availabled
	const { expiration: isAvailabled } = useDomainInfo(
		`${childDomain}.${fatherDomain}`
	);

	const isRightDomain = useMemo(
		() => isSubdomainRegx(`${childDomain}.${fatherDomain}`),
		[childDomain, fatherDomain]
	);

	const { data: gasPrice } = useFeeData();
	const estFee = useMemo(() => {
		const {
			formatted: { gasPrice: price },
		} = gasPrice;
		return formatUnitsWitheDecimals(price * fee, 18);
	}, [fee, gasPrice]);

	const pricesArray = useGetPrice(fatherDomain, [tokenContract['USDT']]);

	const pricesDisplay = useMemo(() => {
		return pricesArray.map((item) => {
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
					price: formatUnitsWitheDecimals(p?.[0], 18) || 10,
				};
			}
		});
	}, [pricesArray, childDomain]);

	const showPriceText = useMemo(() => {
		const checkedObj = pricesDisplay.find(
			(v) => v.symbol.toLowerCase() === checked
		);
		return checkedObj?.price || 10;
	}, [checked, pricesDisplay]);

	const changeRadio = useCallback((e) => {
		setChecked(e.target.value);
	}, []);

	const approveOrPay = useCallback(() => {
		if (!isApprove) {
			approve?.();
		} else {
			// paid
			setIsPaid(true);
		}
	}, [isApprove, approve]);

	const getGas = useCallback(async () => {
		try {
			const estimateGas = await contract.estimateGas.registerSubdomain(
				// splitEth(params?.name)
				'kei',
				'kay.eth',
				'0x2810DF84b4e9210Df472528F773c2F9f48a43724',
				'0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750',
				0,
				'0x80258a9230383763E2A1ECa4B5675b49fdBEECbd',
				'12' + '0'.repeat(18)
			);
			console.log(estimateGas, 'estimateGas');
		} catch (error) {
			console.log(error, 'gas');
		}
	}, [contract]);

	const btnDiabled = useMemo(() => {
		return !isRightDomain || readLoading || !!isAvailabled;
	}, [isRightDomain, readLoading, isAvailabled]);

	const btnLoading = useMemo(
		() => loading || readLoading,
		[loading, readLoading]
	);

	useEffect(() => {
		onChange && onChange(!isApprove || btnDiabled);
	}, [isApprove, btnDiabled, onChange]);

	useEffect(() => {
		getGas();
	}, [getGas]);

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
				-Estimated total:0.0437ETH+{estFee} {checked?.toUpperCase()}{' '}
			</TypographyDes>
			<TypographyDes sx={{ mb: '30px' }}>
				-2.5%service fees is included
			</TypographyDes>
			{isPaid ? (
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
					disabled={btnDiabled}
					variant="contained"
					onClick={approveOrPay}
					loading={btnLoading}
				>
					{isApprove ? `pay ${showPriceText} ${checked}` : 'Approve'}
				</LoadingButton>
			)}
		</>
	);
};

export default memo(StepOne);
