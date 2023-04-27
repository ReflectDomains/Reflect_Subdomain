import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { TypographyInfo } from '.';
import SimpleProgess from '../../components/SimpleProgess';
import { useMemo } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toScan } from '../../utils';

const ContentBar = memo(({ leftText, rightText, isError = false }) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="flex-start"
			sx={(theme) => ({
				width: '507px',
				height: '60px',
				borderRadius: '10px',
				mb: theme.spacing(1),
				backgroundColor: '#fff',
				padding: `0 ${theme.spacing(2)}`,
				boxSizing: 'border-box',
			})}
		>
			<TypographyInfo
				sx={() => ({
					color: '#666',
				})}
			>
				{leftText}
			</TypographyInfo>
			{isError ? (
				<HighlightOffIcon
					sx={(theme) => {
						return { color: theme.color.error };
					}}
				/>
			) : null}
			<TypographyInfo sx={{ marginLeft: 'auto' }}>{rightText}</TypographyInfo>
		</Stack>
	);
});

const StepTwo = ({ state, txHash = '' }) => {
	const progess = useMemo(() => state.registerStep, [state.registerStep]);
	const transactionStatus = useMemo(
		() => state.registerStatus,
		[state.registerStatus]
	);
	const isError = useMemo(
		() => transactionStatus === 'error',
		[transactionStatus]
	);
	return (
		<Stack direction="column" alignItems="center" justifyContent="center">
			<TypographyInfo sx={{ fontWeight: 600, textAlign: 'center', mb: '15px' }}>
				{progess === 100
					? 'All Transactions Complete'
					: isError
					? 'Payment Transcations Error'
					: 'Payment Transcations Sent'}
			</TypographyInfo>
			<SimpleProgess progess={progess} transactionStatus={transactionStatus} />
			<Typography
				sx={(theme) => ({
					fontSize: '12px',
					width: '507px',
					color: theme.typography.subtitle1.color,
					fontWeight: 500,
					mt: '15px',
					mb: '20px',
					textAlign: 'left',
				})}
			>
				{progess === 100
					? '🎉🎉🎉Your transaction is now complete!'
					: 'Your transaction is now in progress, you can close this and come backlater.'}
			</Typography>
			<ContentBar
				leftText="Action1"
				rightText="Register subname by reflect contract"
			/>
			<ContentBar
				isError={isError}
				leftText="Action2"
				rightText="Pay token to domain owner"
			/>
			<TypographyInfo
				onClick={toScan.bind(this, txHash)}
				sx={(theme) => ({ color: theme.color.main })}
			>
				View on Etherscan(Goerli Testnet)
			</TypographyInfo>
		</Stack>
	);
};

export default memo(StepTwo);
