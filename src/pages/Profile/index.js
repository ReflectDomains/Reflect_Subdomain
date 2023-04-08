import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Profile</div>
      <LoadingButton
        onClick={() => {
          navigate("/setting");
        }}
      >
        To Setting
      </LoadingButton>
    </>
  );
};

export default Profile;
