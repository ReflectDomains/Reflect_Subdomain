import { memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const DataTable = ({ digitChecked }) => {
  const columns = [
    { field: "token", headerName: "Token", width: 150 },
    {
      field: "three",
      headerName: "3",
      width: 150,
      editable: true,
    },
  ];

  const digitColumns = [
    { field: "token", headerName: "Token/Digit", width: 150 },
  ];

  const rows = [{ id: 1, token: "USDT", three: 1100, four: 4453, plus: 35 }];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        // columns={columns}
        columns={digitChecked ? digitColumns : columns}
        hideFooter={true}
        disableRowSelectionOnClick
        sx={{ borderRadius: "20px" }}
      />
    </Box>
  );
};

export default memo(DataTable);
