import { Box, Stack, Typography, styled, Popover } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { memo, useCallback, useState } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import CircleStep from '../../components/CircleStep';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const TypographySubtitle = styled(Typography)(({ theme, sx }) => ({
	fontSize: '20px',
	color: theme.typography.caption.color,
	fontWeight: 800,
	...sx,
}));

export const TypographyInfo = styled(Typography)(({ theme, sx }) => ({
	fontSize: '16px',
	color: theme.typography.caption.color,
	fontWeight: 500,
	...sx,
}));

const Register = () => {
	const params = useParams();
	const [step, setStep] = useState(2);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const nextPage = useCallback(() => {
		if (step + 1 <= 3) {
			setStep(step + 1);
		}
	}, [step]);

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
					<Stack
						direction="row"
						alignItems="center"
						sx={{
							mt: '10px',
							mb: '20px',
						}}
					>
						<TypographySubtitle
							sx={(theme) => ({
								fontSize: '16px',
								mr: theme.spacing(1),
							})}
						>
							{step === 1
								? 'Payment Token'
								: step === 2
								? 'Pending registration by reflect contract'
								: 'Setting Profile of Subname(Optional)'}
						</TypographySubtitle>
						{step === 2 ? (
							<ErrorOutlineIcon
								sx={(theme) => ({
									fontSize: '20px',
									color: theme.color.mentionColor,
								})}
								onClick={handleClick}
							/>
						) : null}
					</Stack>
				</Stack>
				<Box
					sx={{
						backgroundColor: '#F7F7F7',
						borderRadius: '10px',
						width: '100%',
						padding: '20px',
					}}
				>
					{step === 1 ? <StepOne /> : step === 2 ? <StepTwo /> : null}
				</Box>
				<Stack flexDirection="row" justifyContent="center" sx={{ mt: '20px' }}>
					<LoadingButton variant="contained" onClick={nextPage}>
						Next
					</LoadingButton>
				</Stack>
			</CommonPage>
			{/* info */}
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Typography sx={{ p: 2, width: '200px' }}>
					The reflect contract will execute subdomain registration, the
					execution process needs to interact with the wallet serval
					times,please cooperate
				</Typography>
			</Popover>
		</Box>
	);
};

export default memo(Register);
