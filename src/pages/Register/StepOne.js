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
import { tokenContract, contractForToken } from '../../config/contract';
import { formatUnitsWitheDecimals } from '../../utils';
import { useFeeData, useProvider } from 'wagmi';
import { ethers } from 'ethers';

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

const StepOne = () => {
	const params = useParams();
	const [checked, setChecked] = useState('usdt');
	const [isApprove, setIsApprove] = useState(false);
	const [isPaid, setIsPaid] = useState(false);

	const provider = useProvider();

	const pricesArray = useGetPrice(params?.name, [tokenContract['USDT']]);

	const pricesDisplay = useMemo(() => {
		return pricesArray.map((item) => {
			const p = item.prices;
			if (item.mode) {
				const len = params?.name.split('.')?.[0].length;
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
	}, [pricesArray, params]);

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
			setIsApprove(true);
		} else {
			// paid
			setIsPaid(true);
		}
	}, [isApprove]);

	const getGas = useCallback(async () => {
		const gasLimit = await provider.estimateGas({
			to: '0xCc5e7dB10E65EED1BBD105359e7268aa660f6734',
			data: '0xf14fcbc8ffc2e13830c81417cba216d5b12090c4f739b7c148c90a45cc0ee604edb4ce16',
			value: ethers.utils.parseEther('0'),
		});

		console.log(gasLimit.toString());
	}, [provider]);

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
			<TypographyDes>-Est.network fee:0.0437ETH </TypographyDes>
			<TypographyDes>
				-Estimated total:0.0437ETH+10 {checked?.toUpperCase()}{' '}
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
				<LoadingButton variant="contained" onClick={approveOrPay}>
					{isApprove ? `pay 10 ${checked}` : 'Approve'}
				</LoadingButton>
			)}
		</>
	);
};

export default memo(StepOne);
