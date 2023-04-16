import CommonPage from '../../components/CommonUI/CommonPage';
import { Radio, Stack, Typography, styled, Box } from '@mui/material';
import { HelpIcon } from '../../assets';
import { useState } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const Title = styled(Typography)(() => ({
	fontSize: '20px',
	fontWeight: 800,
}));

const RadioItem = styled(Radio)(({ theme, ...props }) => ({
	padding: '0px',
	width: '100%',
	height: '65px',
	fontWeight: 800,
	borderRadius: theme.spacing(1),
	border: props.checked
		? '1px solid transparent'
		: `1px solid ${theme.color.text}`,
	background: props.checked ? '#EAF1FB' : '#fff',
	transition: 'border 0.5s ease',

	':hover': {
		border: 'none',
	},

	'&.Mui-disabled': {
		fontWeight: 500,
		color: theme.color.mentionColor,
		border: `1px solid ${theme.color.disabled}`,
	},
}));

const CheckBox = styled(Box)(() => ({
	width: '100%',
	textAlign: 'center',
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
			top: '-10px',
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
	background: props.arrive ? 'white' : 'black',
}));

const StepsWrapper = styled(Box)(({ theme }) => ({
	minHeight: '300px',
	background: '#F6F6F6',
	marginTop: theme.spacing(2),
	borderRadius: theme.spacing(1),
	padding: theme.spacing(2),
}));

const steps = ['Select domain', 'Settings', 'Update controller', 'Complete'];
const stepsPositions = [1, 33, 66, 99];

const EarnDomain = () => {
	// proxy or manual
	const [modeValue, setModeValue] = useState('proxy');

	const [step, setStep] = useState(0);

	const handleChangeMode = (event) => {
		setModeValue(event.target.value);
	};

	return (
		<CommonPage title="Earn by domain" back={-1}>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="flex-start"
				spacing={1}
			>
				<Title>Registration model</Title>
				<HelpIcon />
			</Stack>

			<Stack direction="row" justifyContent="space-between" spacing={1} mt={1}>
				<RadioItem
					name="proxyMode"
					value="proxy"
					checked={modeValue === 'proxy'}
					onChange={handleChangeMode}
					icon={<CheckBox>Proxy registration</CheckBox>}
					checkedIcon={<CheckBox checked={true}>Proxy registration</CheckBox>}
				/>
				<RadioItem
					name="proxyMode"
					value="manual"
					disabled={true}
					checked={modeValue === 'manual'}
					onChange={handleChangeMode}
					icon={<CheckBox>Manual registration</CheckBox>}
					checkedIcon={<CheckBox checked={true}>Manual registration</CheckBox>}
				/>
			</Stack>

			<Title mt={3}>Process</Title>
			<ProgressWrapper>
				<ProgressBar
					filledBackground="linear-gradient(90deg, #7D66FF 0.63%, #40BF82 100%)"
					percent={[stepsPositions[step]]}
					stepPositions={[1, 33, 66, 99]}
				>
					{steps.map((item, index) => (
						<Step key={index}>
							{({ accomplished, position, index }) => {
								console.log(
									'position:location',
									position,
									':',
									stepsPositions[index]
								);
								console.log(
									'status:',
									!accomplished
										? 'pending'
										: position > stepsPositions[index]
										? 'done'
										: 'arrive'
								);
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
										<ProgressDot arrive={accomplished}>
											{accomplished}
										</ProgressDot>
									</Stack>
								);
							}}
						</Step>
					))}
				</ProgressBar>
			</ProgressWrapper>

			{step === 0 && (
				<StepsWrapper>
					<StepOne handleStep={setStep} />
				</StepsWrapper>
			)}
			{step === 1 && <StepTwo handleStep={setStep} />}
			{step === 2 && <StepThree handleStep={setStep} />}
			{step === 3 && <StepFour handleStep={setStep} />}
		</CommonPage>
	);
};

export default EarnDomain;
