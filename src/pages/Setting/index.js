import { useForm, Controller } from 'react-hook-form';
import CommonPage from '../../components/CommonUI/CommonPage';
import LabelInput from '../../components/CommonUI/LabelInput';
import { useCallback, useState } from 'react';
import MultipleInput from '../../components/CommonUI/MultipleInput';
import { InputLabel, Stack } from '@mui/material';
import AvatarInput from '../../components/CommonUI/AvatarInput';
import { LoadingButton } from '@mui/lab';
import { getProfile, setProfile } from '../../api/profile';
import { toast } from 'react-toastify';

const LabelText = { fontSize: '20px', fontWeight: 600 };

const Setting = () => {
	const { handleSubmit, control } = useForm({
		defaultValues: () => handleGetProfile(),
	});
	const [avatar, setAvatar] = useState();
	const [saveLoading, setSaveLoading] = useState(false);

	const handleSetProfile = async (data) => {
		setSaveLoading(true);
		const resp = await setProfile(data);
		if (resp?.code === 0) {
			toast.success(resp.msg);
		}
		setSaveLoading(false);
	};

	const handleGetProfile = async () => {
		const resp = await getProfile();
		console.log('resp:', resp);
	};

	const handleUploadAvatarSuccess = useCallback((inputRef, img) => {
		setAvatar(img);
		inputRef.current.value = '';
	}, []);

	const handleUploadAvatarError = useCallback((inputRef) => {
		console.log('upload avatar failed');
		inputRef.current.value = '';
	}, []);

	return (
		<CommonPage title="Settings">
			<form onSubmit={handleSubmit(handleSetProfile)}>
				<Stack direction="column" spacing={3}>
					<AvatarInput
						label="Avatar"
						avatar={avatar}
						labelSx={LabelText}
						onSuccess={handleUploadAvatarSuccess}
						onError={handleUploadAvatarError}
						ref={null}
					/>
					<Controller
						name="slogan"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<MultipleInput
								{...field}
								label="Slogan"
								labelSx={LabelText}
								multiline
								rows={4}
								minRows={4}
								maxcounts={100}
								ref={null}
							/>
						)}
					/>

					{/* Social Media */}
					<Stack direction="column" spacing={2}>
						<InputLabel sx={{ ...LabelText }}>Social Media</InputLabel>

						<Controller
							name="twitter"
							control={control}
							defaultValue=""
							render={({ field, ref = null }) => (
								<LabelInput
									label="-Twitter"
									placeholder="@"
									{...field}
									ref={null}
								/>
							)}
						/>

						<Controller
							name="discord"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<LabelInput
									label="-Discord"
									placeholder="https:"
									{...field}
									ref={null}
								/>
							)}
						/>
						<Controller
							name="medium"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<LabelInput
									label="-Medium"
									placeholder="https:"
									{...field}
									ref={null}
								/>
							)}
						/>
						<Controller
							name="telegram"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<LabelInput
									label="-Telegram"
									placeholder="@"
									{...field}
									ref={null}
								/>
							)}
						/>
					</Stack>

					<Stack
						direction="row"
						justifyContent="center"
						spacing={2}
						sx={(theme) => ({
							padding: theme.spacing(2, 0, 2, 0),
						})}
					>
						<LoadingButton
							// loading={true}
							loadingPosition="start"
							onClick={() => {
								handleGetProfile();
							}}
						>
							Reset
						</LoadingButton>
						<LoadingButton
							type="submit"
							loading={saveLoading}
							variant="contained"
							loadingPosition="start"
							onClick={() => {
								handleSubmit(handleSetProfile);
							}}
						>
							Save
						</LoadingButton>
					</Stack>
				</Stack>
			</form>
		</CommonPage>
	);
};

export default Setting;
