import { createTheme } from "@mui/material/styles";

import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.white,
    },
    neutral:{
      main: colors.black,
      contrastText: colors.white,
    },
    common:{
      main: colors.white,
      contrastText: colors.black,
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
        },
      },
    },
  },
});

export default theme;
