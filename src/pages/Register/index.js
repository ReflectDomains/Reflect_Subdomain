import { Box, Stack, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo, useCallback, useReducer, useState } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
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

const initState = {
	registerStatus: null,
	registerStep: 50,
	txHash: ''
}

const reducer = (state, action) => {
	switch (action.type) {
		case "registerStatus":
			return {...state, registerStatus: action.payload, registerStep: action.payload === 'success'? 100: 50 }
		case "registerHash":
			return {...state, txHash: action.payload}
		default:
			return {...state}
	}
}

const Register = () => {
	const params = useParams();
	const [step, setStep] = useState(2);
	const [state, dispatch] = useReducer(reducer, {...initState})

	const nextPage = useCallback(() => {
		if (step + 1 <= 3) {
			setStep(parseInt(step + 1));
		}
	}, [step]);

	const childDomain = useMemo(
		() => params?.name.split('-')?.[0] || '',
		[params.name]
	);

	const fatherDomain = useMemo(
		() => params?.name.split('-')[1] || '',
		[params.name]
	);

	const makeUpFullDomain = useMemo(
		() => (childDomain && fatherDomain ? `${childDomain}.${fatherDomain}` : ''),
		[childDomain, fatherDomain]
	);

	// todo check domain is availabled
	const { expiration: fatherExpiration, days } = useDomainInfo(fatherDomain);

	const backToAfterStep = useCallback(() => {
		if (step > 0) {
			setStep(step - 1)
		}
	}, [step])

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
					{step < 3 ? <StepAndCircleProcess step={step} /> : <LastStep />}
				</Stack>
				<Box
					sx={{
						backgroundColor: step < 3 ? '#F7F7F7' : '#fff',
						borderRadius: '10px',
						width: '100%',
						padding: '20px',
					}}
				>
					{step === 1 ? (
						<StepOne
							onNext={nextPage}
							domainInfo={{
								makeUpFullDomain,
							}}
							dispatch={dispatch}
							state={state}
						/>
					) : step === 2 ? (
						<StepTwo dispatch={dispatch} state={state} />
					) : null}
				</Box>
				{step < 3 ? (
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
						{
							step === 2 ? (
								<LoadingButton
								disabled={state.registerStep==='success'}
								variant="contained"
								onClick={nextPage}
								>
									Next
								</LoadingButton>
							): null
						}
					</Stack>
				) : null}
			</CommonPage>
		</Box>
	);
};

export default memo(Register);
