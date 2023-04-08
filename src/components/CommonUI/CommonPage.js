import { Box, Paper, Typography, styled } from "@mui/material";
import { memo } from "react";

const Title = styled(Typography)(() => ({
  fontSize: "32px",
  fontWeight: 800,
}));

const Content = styled(Paper)(({ theme }) => ({
  boxShadow: "0px 4px 34px -8px rgba(39, 23, 132, 0.2)",
  borderRadius: "30px",
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

const CommonPage = ({ title, children }) => {
  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing(2, 0, 6, 0),
      })}
    >
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Box>
  );
};

export default memo(CommonPage);
