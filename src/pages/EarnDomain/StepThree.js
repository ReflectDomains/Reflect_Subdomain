import { Box, Stack, styled, Button } from '@mui/material';
import { memo } from 'react';
import ManageDomain from '../../components/ManageDomain';

const StepsWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	gap: theme.spacing(2),
	minHeight: '300px',
	background: '#F6F6F6',
	marginTop: theme.spacing(2),
	borderRadius: theme.spacing(1),
	padding: theme.spacing(2),
}));

const StepThree = ({ handleStep }) => {
	return (
		<Box>
			<StepsWrapper>
				<ManageDomain />
			</StepsWrapper>

			<Stack direction="row" justifyContent="center" spacing={2} mt={2}>
				<Button
					variant="outlined"
					onClick={() => {
						handleStep(0);
					}}
				>
					Back
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						handleStep(2);
					}}
				>
					Next
				</Button>
			</Stack>
		</Box>
	);
};

export default memo(StepThree);
