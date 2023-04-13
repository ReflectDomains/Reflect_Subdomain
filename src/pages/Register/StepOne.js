import { memo, useCallback, useState } from 'react';
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
	const [checked, setChecked] = useState('usdt');
	const [isApprove, setIsApprove] = useState(false);
	const [isPaid, setIsPaid] = useState(false);

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
	return (
		<>
			<TypographyInfo sx={{ mb: '10px' }}>Supported Tokens:</TypographyInfo>
			<RadioGroup row onChange={changeRadio}>
				<StyledFormControlLabel
					value="usdt"
					label="10 USDT"
					checked={checked === 'usdt'}
					control={<Radio999 />}
				/>
				<StyledFormControlLabel
					value="usdc"
					label="10 USDC"
					checked={checked === 'usdc'}
					control={<Radio999 />}
				/>
			</RadioGroup>
			<TypographyDes sx={{ mt: '30px' }}>
				-Registration fee:10 {checked?.toUpperCase()}
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
