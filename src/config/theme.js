const { createTheme } = require("@mui/material");

// font-size
let theme = createTheme({
  palette: {
    primary: {
      main: "#2A13AE",
      contrastText: "#FFFFFFE5",
      hover: "#2A13EA",
      active: "#2A1372",
    },
    secondary: {
      main: "#fff",
      contrastText: "#333333",
      hover: "#F2F4F5",
    },
  },
  spacing: 10,
  typography: {
    fontFamily: ["Inter"].join(","),
    fontSize: 16,
    caption: {
      color: "#333",
      fontWeight: 500,
    },
    subtitle1: {
      color: "#666",
    },
    body1: {
      fontWeight: 500,
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        color: "#333",
        fontWeight: 500,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          background: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          fontSize: theme.typography.fontSize,
          borderRadius: theme.spacing(1),
          textTransform: "initial",
          boxShadow: "unset",
          ...(ownerState.shape === "round" && {
            borderRadius: "50px",
          }),
          ":hover": {
            backgroundColor: theme.palette.secondary.hover,
            boxShadow: "unset",
          },
        }),
        contained: ({ theme }) => ({
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          ":hover": {
            backgroundColor: theme.palette.primary.hover,
          },
          ":active": {
            backgroundColor: theme.palette.primary.active,
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(1),
          boxShadow: "0px 4px 34px -8px rgba(39, 23, 132, 0.2)",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1, 2),
          borderRadius: theme.spacing(1),
          fontSize: theme.typography.fontSize,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "unset",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          ":hover": {
            color: "#F2F4F5",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minWidth: "unset",
          padding: theme.spacing(1, 2),
          borderRadius: theme.spacing(1),
          fontSize: theme.typography.fontSize,
        },
      },
    },
  },
});

export default theme;
