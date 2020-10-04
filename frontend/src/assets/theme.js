import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
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
  }
});

export default theme;
