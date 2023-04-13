import { Stack, styled, LinearProgress } from '@mui/material';
import { memo } from 'react';
import { TypographyInfo } from '.';
import EmojLaught from '../../assets/icons/register/emo_laught.svg';

const CustomLinearProgress = styled(LinearProgress)((theme) => ({
	width: '497px',
	height: '30px',
	borderRadius: '30px',
	background: '#F7F7F7',
	border: '2px solid #E2E2E2',
	'.MuiLinearProgress-bar': {
		borderRadius: '30px',
		'&::after': {
			position: 'absolute',
			content: '""',
			right: 0,
			top: 0,
			background: `url(${EmojLaught})`,
			width: '40px',
			height: '40px',
		},
	},
}));

const StepTwo = () => {
	return (
		<Stack direction="row" justifyContent="center">
			<TypographyInfo sx={{ fontWeight: 600, textAlign: 'center' }}>
				Payment Transcations Sent
				<CustomLinearProgress value={10} variant="determinate" />
			</TypographyInfo>
		</Stack>
	);
};

export default memo(StepTwo);
