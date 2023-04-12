import {
	Box,
	Stack,
	Typography,
	styled,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { memo } from 'react';
import CommonPage from '../../components/CommonUI/CommonPage';
import { useParams } from 'react-router-dom';
import CircleStep from '../../components/CircleStep';

const TypographySubtitle = styled(Typography)(({ theme, sx }) => ({
	fontSize: '20px',
	color: theme.typography.caption.color,
	fontWeight: 800,
	...sx,
}));

const TypographypInfo = styled(Typography)(({ theme, sx }) => ({
	fontSize: '16px',
	color: theme.typography.caption.color,
	fontWeight: 500,
	...sx,
}));

const TypographyDes = styled(Typography)(({ sx }) => ({
	color: '#999',
	fontSize: '14px',
	marginBottom: '10px',
	...sx,
}));

const Radio999 = styled(Radio)(() => ({
	color: '#999',
}));

const StyledFormControlLabel = styled((props) => (
	<Box
		sx={{
			border: '2px solid #999',
			borderRadius: '10px',
			mr: '10px',
			pl: '10px',
			background: `${
				props.checked ? 'rgba(47, 115, 218, 0.1);' : 'transparent'
			}`,
		}}
	>
		<FormControlLabel {...props} />
	</Box>
))(({ checked }) => ({
	'.MuiFormControlLabel-label': {
		backgroundColor: 'trasparent',
		color: checked ? '#333' : '#999',
	},
}));

const Register = () => {
	const params = useParams();
	return (
		<Box>
			<CommonPage title="Registration">
				<TypographySubtitle>Basic Info</TypographySubtitle>
				<TypographypInfo sx={{ mt: '10px' }}>
					Subname: {params?.name}
				</TypographypInfo>
				<TypographypInfo sx={{ mt: '10px' }}>
					Expiry:until 2025.x.x (xx days)
				</TypographypInfo>
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
					<CircleStep step={1} total={3} />
					<TypographySubtitle sx={{ fontSize: '16px', mt: '10px', mb: '20px' }}>
						Payment Token
					</TypographySubtitle>
				</Stack>
				<Box
					sx={{
						backgroundColor: '#F7F7F7',
						borderRadius: '10px',
						width: '100%',
						padding: '20px',
					}}
				>
					<TypographypInfo sx={{ mb: '10px' }}>
						Supported Tokens:
					</TypographypInfo>
					<RadioGroup row>
						<StyledFormControlLabel
							value="usdt"
							label="10 USDT"
							checked={true}
							control={<Radio999 />}
						/>
						<StyledFormControlLabel
							value="usdc"
							label="10 USDC"
							control={<Radio999 />}
						/>
					</RadioGroup>
					<TypographyDes sx={{ mt: '30px' }}>
						-Registration fee:10USDC
					</TypographyDes>
					<TypographyDes>-Est.network fee:0.0437ETH </TypographyDes>
					<TypographyDes>-Estimated total:0.0437ETH+10USDC </TypographyDes>
					<TypographyDes sx={{ mb: '30px' }}>
						-2.5%service fees is included
					</TypographyDes>
					<LoadingButton variant="contained">Approve</LoadingButton>
				</Box>
				<Stack flexDirection="row" justifyContent="center" sx={{ mt: '20px' }}>
					<LoadingButton variant="contained">Next</LoadingButton>
				</Stack>
			</CommonPage>
		</Box>
	);
};

export default memo(Register);
