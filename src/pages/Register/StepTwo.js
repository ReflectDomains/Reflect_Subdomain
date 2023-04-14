import { Stack } from '@mui/material';
import { memo } from 'react';
import { TypographyInfo } from '.';
import SimpleProgess from '../../components/SimpleProgess';

const StepTwo = () => {
	return (
		<Stack direction="row" justifyContent="center">
			<TypographyInfo sx={{ fontWeight: 600, textAlign: 'center' }}>
				Payment Transcations Sent
				<SimpleProgess progess={0} />
			</TypographyInfo>
		</Stack>
	);
};

export default memo(StepTwo);
