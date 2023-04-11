import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  Stack,
  Switch,
  Table,
  styled,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  Paper,
  Box,
  TableBody,
} from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import DataTable from "./DataTable";
import { LoadingButton } from "@mui/lab";

const Cell = styled(TableCell)(({ theme }) => ({
  width: "50px",
  padding: theme.spacing(1),
  textAlign: "center",
  input: {
    width: "100%",
    border: "none",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: theme.typography.fontSize,
    ...theme.typography.caption,
    ":active,:hover,:focus-visible": {
      border: "none",
    },
    "&:focus-visible": {
      border: "none",
      outline: "none",
    },
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  // ...theme.typography.caption,
  // fontSize: theme.typography.fontSize,
}));

const list = [
  {
    name: "Jassen.eth",
    type: "Management",
    digit: true,
    tokens: {
      USDT: true,
      USDC: false,
      ETH: false,
      DAI: false,
    },
  },
  {
    name: "meta.eth",
    type: "earn",
    digit: false,
    tokens: {
      USDT: true,
      USDC: false,
      ETH: false,
      DAI: false,
    },
  },
  {
    name: "hash.eth",
    type: "Management",
    digit: false,
    tokens: {
      USDT: true,
      USDC: false,
      ETH: false,
      DAI: false,
    },
  },
];

const ManageDomain = () => {
  const { address } = useAccount();

  const [domainList, setDomainList] = useState(list);

  const [checkList, setCheckList] = useState({
    USDT: true,
    USDC: false,
    ETH: false,
    DAI: false,
  });

  const [digitChecked, setDightChecked] = useState(true);

  const calCheckedCount = useCallback(() => {
    const arr = Object.values(checkList);
    const checkedList = arr.filter((item) => item === true);
    console.log("checkedList:", checkedList);
    return checkedList.length;
  }, [checkList]);

  const tableWidth = useMemo(() => {
    return calCheckedCount() * 20;
  }, [calCheckedCount]);

  const handleChangeToken = useCallback(
    (event) => {
      const name = event.target.name;
      const checked = event.target.checked;
      let falseCount = 0;
      // TODO:判断是否只剩最后一个可选项，如果是则不可取消选中
      setCheckList({ ...checkList, [name]: checked });
    },
    [checkList]
  );

  console.log("checkList:", checkList);

  const handleChangeDigit = (event) => {
    setDightChecked(event.target.checked);
  };

  console.log("tableWidth:", tableWidth);

  return (
    <>
      {/* Choose tokens */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Label>Paid token:</Label>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {Object.keys(checkList).map((value, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name={value}
                  value={checkList[value]}
                  checked={checkList[value]}
                  required={value === "USDT"}
                  disabled={value !== "USDT"}
                  onChange={handleChangeToken}
                />
              }
              label={value}
            />
          ))}
        </FormGroup>
      </Stack>
      {/* Receiving adress */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Label>Receiving address:</Label>
        <Input value={address} disableUnderline={true} />
      </Stack>
      {/* Pricing */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Label>Pricing: by-digit</Label>
        <Switch checked={digitChecked} onChange={handleChangeDigit} />
      </Stack>
      <TableContainer
        sx={(theme) => ({
          width: digitChecked ? "80%" : `${tableWidth}%`,
          minWidth: "30%",
          maxWidth: "100%",
          border: "1px solid #0000001A",
          borderRadius: theme.spacing(1),
        })}
      >
        {digitChecked ? (
          <Table>
            <TableHead>
              <TableRow sx={{ borderRadius: "20px" }}>
                <Cell>Token/digit</Cell>
                <Cell>3</Cell>
                <Cell>4</Cell>
                <Cell>4+</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <Cell component="th" scope="row">
                  Price
                </Cell>
                <Cell component="th" scope="row">
                  <input defaultValue={10} />
                </Cell>
                <Cell component="th" scope="row">
                  <input defaultValue={10} />
                </Cell>
                <Cell component="th" scope="row">
                  <input defaultValue={10} />
                </Cell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ borderRadius: "20px" }}>
                <Cell>Token</Cell>
                {Object.keys(checkList).map((value) =>
                  checkList[value] ? <Cell key={value}>{value}</Cell> : ""
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <Cell component="th" scope="row">
                  Price
                </Cell>
                {Object.keys(checkList).map((value) =>
                  checkList[value] ? (
                    <Cell component="th" scope="row" key={value}>
                      <input defaultValue={10} />
                    </Cell>
                  ) : (
                    ""
                  )
                )}
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {/* <DataTable digitChecked={digitChecked} /> */}
      <Box>
        <LoadingButton sx={{ width: "85px" }} variant="contained">
          Confirm
        </LoadingButton>
      </Box>
    </>
  );
};

export default memo(ManageDomain);
