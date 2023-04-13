import { Box, Stack } from '@mui/material';
import { memo } from 'react';

const CircleStep = ({ step = 1, total = 1 }) => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			sx={(theme) => ({
				width: 60,
				height: 60,
				backgroundColor: theme.color.backColor,
				textAlign: 'center',
				borderRadius: '50%',
			})}
		>
			<Box
				sx={{
					width: 48,
					height: 48,
					background: '#fff',
					borderRadius: '50%',
					color: '#333',
					fontSize: 16,
				}}
			>
				<p>
					{step}/ {total}
				</p>
			</Box>
		</Stack>
	);
};

export default memo(CircleStep);
