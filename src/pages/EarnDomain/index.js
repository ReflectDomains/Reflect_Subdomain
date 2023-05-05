import CommonPage from '../../components/CommonUI/CommonPage';
import { Stack, Typography, styled, Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { useNavigate, useParams } from 'react-router-dom';

const Title = styled(Typography)(() => ({
	fontSize: '20px',
	fontWeight: 800,
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	marginTop: theme.spacing(4),

	'.RSPBprogression': {
		zIndex: 0,
		'::after': {
			display: 'block',
			position: 'relative',
			content: '"😮"',
			left: '100%',
			top: '-6px',
			zIndex: 999,
			fontSize: '30px',
			transform: 'translateX(-20px)',
		},
	},
}));

const ProgressLabel = styled('span')(({ theme, ...props }) => ({
	position: 'absolute',
	fontSize: '16px',
	fontWeight: 800,
	textAlign: 'left',
	top: '-30px',
	whiteSpace: 'nowrap',
	color:
		props.status === 'pending' ? theme.color.mentionColor : theme.color.main,
}));

const ProgressDot = styled(Box)(({ theme, ...props }) => ({
	width: '5px',
	height: '5px',
	borderRadius: '50px',
	background: props.arrive === 'true' ? 'white' : 'black',
}));

const StepsWrapper = styled(Box)(({ theme }) => ({
	minHeight: '300px',
	background: '#F6F6F6',
	marginTop: theme.spacing(2),
	borderRadius: theme.spacing(1),
	padding: theme.spacing(2),
}));

const steps = ['Select domain', 'Update operator', 'Settings', 'Complete'];
const stepsPositions = [1, 33, 66, 99];

const EarnDomain = () => {
	// proxy or manual
	const navigator = useNavigate();
	const params = useParams();

	const [step, setStep] = useState(0);

	const toNext = useCallback(
		(step, ens) => {
			if (step < 0) {
				navigator(-1)
			} else {
				navigator(`/domain/${step}${ens ? '/' + ens : ''}`);
			}
		},
		[navigator]
	);

	useEffect(() => {
		setStep(Number(params?.step ?? 0));
	}, [params]);

	return (
		<CommonPage title="Earn by domain" back={-1}>
			<Title mt={3}>Process</Title>
			<ProgressWrapper>
				<ProgressBar
					filledBackground="linear-gradient(90deg, #0057FF 0.63%, #77FFCE 100%)"
					percent={[stepsPositions[step]]}
					stepPositions={[1, 33, 66, 99]}
					height={20}
				>
					{steps.map((item, index) => (
						<Step key={index}>
							{({ accomplished, _, index }) => {
								return (
									<Stack>
										<ProgressLabel
											status={!accomplished ? 'pending' : 'done'}
											style={{
												transform:
													index === steps.length - 1
														? 'translateX(-100%)'
														: index === 0
														? ''
														: 'translateX(-50%)',
											}}
										>
											{item}
										</ProgressLabel>
										<ProgressDot arrive={accomplished.toString()} />
									</Stack>
								);
							}}
						</Step>
					))}
				</ProgressBar>
			</ProgressWrapper>

			{step === 0 && (
				<StepsWrapper>
					<StepOne handleStep={toNext} />
				</StepsWrapper>
			)}
			{step === 1 && <StepTwo handleStep={toNext} />}
			{step === 2 && <StepThree handleStep={toNext} />}
			{step === 3 && <StepFour handleStep={toNext} />}
		</CommonPage>
	);
};

export default EarnDomain;
