import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue.A400,
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f8f8f8',
    },
  },
});

export default theme;
