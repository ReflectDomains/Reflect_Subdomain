import { Stack } from '@mui/material';
import { memo } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TypographyInfo } from '.';
import { LoadingButton } from '@mui/lab';

const LastStep = () => {
	return (
		<Stack direction="column" alignItems="center">
			<CheckCircleIcon
				sx={(theme) => ({
					color: theme.color.success,
					fontSize: '60px',
				})}
			/>
			<TypographyInfo
				sx={(theme) => ({
					fontWeight: 800,
					mt: theme.spacing(1),
					mb: theme.spacing(6),
				})}
			>
				Complete
			</TypographyInfo>
			<LoadingButton variant="outlined" sx={{ background: 'transparent' }}>
				View my Subname
			</LoadingButton>
		</Stack>
	);
};

export default memo(LastStep);
