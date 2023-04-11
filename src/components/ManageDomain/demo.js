import { memo } from "react";

const demo = () => {
  return (
    <TableContainer
      sx={(theme) => ({
        width: dightChecked ? "80%" : `${tableWidth}%`,
        minWidth: "30%",
        maxWidth: "100%",
        border: "1px solid #0000001A",
        borderRadius: theme.spacing(1),
      })}
    >
      {dightChecked ? (
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
      ) : (
        <Table
          sx={
            {
              // width: `${tableWidth}%`,
              // minWidth: "30%",
            }
          }
        >
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
  );
};

export default memo(demo);
