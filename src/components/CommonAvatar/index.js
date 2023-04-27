import { Avatar } from '@mui/material';
import { AvatarGenerator } from 'random-avatar-generator';

const CommonAvatar = ({ ...props }) => {
	const { address, scope, sx, avatar } = props;

	const generator = new AvatarGenerator();
	let addrAvatar = generator.generateRandomAvatar(address);

	return avatar ? (
		<Avatar
			src={avatar}
			sx={{
				width: `${scope}px`,
				height: `${scope}px`,
				borderRadius: '50px',
				...sx,
			}}
		/>
	) : (
		// <BlockiesAvatar
		//   seed={props?.address ? props.address : address}
		//   sx={sx}
		//   scope={scope}
		// />
		<Avatar
			src={addrAvatar}
			sx={{
				width: `${scope}px`,
				height: `${scope}px`,
				borderRadius: '50px',
				...sx,
			}}
		/>
	);
};

export default CommonAvatar;
