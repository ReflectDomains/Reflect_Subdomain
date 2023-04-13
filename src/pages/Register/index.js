import {
	Box,
	Stack,
	Typography,
	styled,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo, useCallback, useState } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import CircleStep from '../../components/CircleStep';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const TypographySubtitle = styled(Typography)(({ theme, sx }) => ({
	fontSize: '20px',
	color: theme.typography.caption.color,
	fontWeight: 800,
	...sx,
}));

const TypographyInfo = styled(Typography)(({ theme, sx }) => ({
	fontSize: '16px',
	color: theme.typography.caption.color,
	fontWeight: 500,
	...sx,
}));

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

const Register = () => {
	const params = useParams();
	const [step, setStep] = useState(1);
	const [checked, setChecked] = useState('usdt');
	const [isApprove, setIsApprove] = useState(false);
	const [isPaid, setIsPaid] = useState(false);

	const nextPage = useCallback(() => {
		if (step + 1 <= 3) {
			setStep(step + 1);
		}
	}, [step]);

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
		<Box>
			<CommonPage title="Registration">
				<TypographySubtitle>Basic Info</TypographySubtitle>
				<TypographyInfo sx={{ mt: '10px' }}>
					Subname: {params?.name}
				</TypographyInfo>
				<TypographyInfo sx={{ mt: '10px' }}>
					Expiry:until 2025.x.x (xx days)
				</TypographyInfo>
				<TypographySubtitle sx={{ marginTop: '30px' }}>
					Process
				</TypographySubtitle>
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: '10px',
					}}
				>
					<CircleStep step={step} total={3} />
					<TypographySubtitle sx={{ fontSize: '16px', mt: '10px', mb: '20px' }}>
						Payment Token
					</TypographySubtitle>
				</Stack>
				<Box
					sx={{
						backgroundColor: '#F7F7F7',
						borderRadius: '10px',
						width: '100%',
						padding: '20px',
					}}
				>
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
				</Box>
				<Stack flexDirection="row" justifyContent="center" sx={{ mt: '20px' }}>
					<LoadingButton variant="contained" onClick={nextPage}>
						Next
					</LoadingButton>
				</Stack>
			</CommonPage>
		</Box>
	);
};

export default memo(Register);
