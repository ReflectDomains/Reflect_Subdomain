import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { MentionIcon } from "../../assets";
import PopularDomainCard from "./PopularDomainCard";
import avatar from "../../assets/images/avatar.png";

const Title = styled(Typography)(() => ({
  fontSize: "36px",
  fontWeight: 800,
  textAlign: "center",
  marginTop: "20vh",
}));

const HomeButton = styled(Button)(({ theme }) => ({
  minWidth: "300px",
  height: "50px",
}));

const MentionButton = styled(MentionIcon)(() => ({
  cursor: "pointer",
}));

const PopularDomainsText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "28px",
  fontWeight: 800,
  marginTop: theme.spacing(14),
}));

const Home = () => {
  return (
    <Box>
      <Title>One-stop buy,sale,management of your web3 subname of ENS</Title>

      <Stack direction="row" justifyContent="center" spacing={3} mt={6}>
        <HomeButton color="black">Buy Subname </HomeButton>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <HomeButton color="black">Earn By Subname</HomeButton>
          <MentionButton
            onClick={() => {
              console.log("click mention icon");
            }}
          />
        </Stack>
      </Stack>

      <PopularDomainsText>🔥 Popular Domain Names</PopularDomainsText>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={5}
      >
        <PopularDomainCard avatar={avatar} name="jassen.eth" cup={"🥇"} />
        <PopularDomainCard avatar={avatar} name="meta.eth" cup={"🥈"} />
        <PopularDomainCard avatar={avatar} name="reflect.eth" cup={"🥉"} />
        <PopularDomainCard avatar={avatar} name="sns.eth" />
      </Stack>
    </Box>
  );
};

export default Home;
