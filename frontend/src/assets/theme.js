import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile: 500,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#aed581",
    },
    secondary: {
      main: "#ffca28",
    },
  },
  typography: {
      fontFamily: "Barlow",
      button: {
        textTransform: 'none'
      }
  }
});

export default theme;
