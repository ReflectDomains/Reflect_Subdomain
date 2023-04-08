import { Avatar, styled } from "@mui/material";
import Blockies from "react-blockies";

const BlockiesAvatar = styled(Blockies)(({ ...props }) => ({
  width: `${props.scope}px !important`,
  height: `${props.scope}px !important`,
  borderRadius: props.borderRadius ? `${props.borderRadius}px` : "50px",
}));

const CommonAvatar = ({ ...props }) => {
  const { address, scope, avatar } = props;

  return avatar ? (
    <Avatar
      src={avatar}
      sx={{
        width: `${props.scope}px`,
        height: `${props.scope}px`,
      }}
    />
  ) : (
    <BlockiesAvatar seed={address} scope={scope} />
  );
};

export default CommonAvatar;
