import { Box, Stack, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo, useCallback, useState } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import LastStep from './LastStep';
import StepAndCircleProcess from './StepAndCircleProcess';
import useDomainInfo from '../../hooks/useDomainInfo';
import { useMemo } from 'react';

export const TypographySubtitle = styled(Typography)(({ theme, sx }) => ({
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
	const [step, setStep] = useState(1);
	const [disabled, setDisabled] = useState(true);

	const nextPage = useCallback(() => {
		if (step + 1 <= 4) {
			setStep(parseInt(step + 1));
		}
	}, [step]);

	const childDomain = useMemo(
		() => params?.name.split('-')?.[0] || '',
		[params.name]
	);

	const fatherDomain = useMemo(() => params?.name.split('-')[1] || '', [params.name]);

	const makeUpFullDomain = useMemo(() => childDomain && fatherDomain ? `${childDomain}.${fatherDomain}`: '', [childDomain, fatherDomain])

	// todo check domain is availabled
	const { expiration: fatherExpiration, days} = useDomainInfo(fatherDomain)
	


	const backToAfterStep = useCallback(() => {
		if (step - 1 > 0) {
			setStep(parseInt(step - 1));
		}
	}, [step]);

	const changeToNextStep = useCallback((disabled) => {
		setDisabled(disabled);
	}, []);

	return (
		<Box>
			<CommonPage title="Registration">
				<TypographySubtitle>Basic Info</TypographySubtitle>
				<TypographyInfo sx={{ mt: '10px' }}>
					Subname: {makeUpFullDomain}
				</TypographyInfo>
				<TypographyInfo sx={{ mt: '10px' }}>
					Expiry:until {fatherExpiration} ({days} days)
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
					{step < 4 ? <StepAndCircleProcess step={step} /> : <LastStep />}
				</Stack>
				<Box
					sx={{
						backgroundColor: step < 4 ? '#F7F7F7' : '#fff',
						borderRadius: '10px',
						width: '100%',
						padding: '20px',
					}}
				>
					{step === 1 ? (
						<StepOne onChange={changeToNextStep} domainInfo={{
							makeUpFullDomain,
						}} />
					) : step === 2 ? (
						<StepTwo />
					) : step === 3 ? (
						<StepThree />
					) : null}
				</Box>
				{step < 4 ? (
					<Stack
						flexDirection="row"
						justifyContent="center"
						sx={{ mt: '20px' }}
					>
						{step > 1 ? (
							<LoadingButton
								variant="outlined"
								onClick={backToAfterStep}
								sx={(theme) => ({
									mr: theme.spacing(2),
								})}
							>
								Back
							</LoadingButton>
						) : null}
						<LoadingButton
							disabled={disabled}
							variant="contained"
							onClick={nextPage}
						>
							Next
						</LoadingButton>
					</Stack>
				) : null}
			</CommonPage>
		</Box>
	);
};

export default memo(Register);
