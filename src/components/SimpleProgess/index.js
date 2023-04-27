import { styled, LinearProgress, Box } from '@mui/material';
import { memo } from 'react';
const CustomLinearProgressOut = styled(LinearProgress)(
	({ value, transaction }) => ({
		width: '508px',
		// height: '40px',
		// windows
		height: '60px',
		// top: '-4px',
		// windows
		top: '-1px',
		borderRadius: '20px',
		background: 'transparent',
		'.MuiLinearProgress-bar': {
			borderRadius: '30px',
			background: 'transparent',
			'&::after': {
				position: 'absolute',
				content:
					value === 100 ? '"☺️"' : transaction === 'error' ? '"😓"' : '"😃"',
				right: '-2px',
				top: '-5px',
				background: `transparent`,
				width: '40px',
				height: '60px',
				zIndex: 1,
				fontSize: '40px',
			},
		},
	})
);

const CustomLinearProgressInner = styled(LinearProgress)(() => ({
	position: 'absolute',
	top: '3px',
	left: '4px',
	width: '497px',
	height: '30px',
	borderRadius: '30px',
	background: '#F7F7F7',
	border: '2px solid #E2E2E2',
	'.MuiLinearProgress-bar': {
		background: 'linear-gradient(90deg, #7D66FF 0.63%, #40BF82 100%)',
		borderRadius: '30px',
		'&::after': {
			position: 'absolute',
			content: '""',
			right: '-6px',
			top: '-1px',
			background: `transparent`,
			width: '40px',
			height: '40px',
			zIndex: 1,
		},
	},
}));

const SimpleProgess = ({ progess, transactionStatus }) => {
	return (
		<Box
			sx={{
				position: 'relative',
			}}
		>
			<CustomLinearProgressInner
				value={Number(progess)}
				variant="determinate"
			/>
			<CustomLinearProgressOut
				value={Number(progess) <= 0 ? 7 : Number(progess)}
				variant="determinate"
				transaction={transactionStatus}
			/>
		</Box>
	);
};

export default memo(SimpleProgess);
