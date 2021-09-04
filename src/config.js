import {createTheme} from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		type: 'light',
        primary: {
            main: '#f6911e',
            contrastText: '#FFF',
            light: '#768b98',
            dark: '#768b98',
        },
        secondary: {
            main: '#768b98',
            contrastText: '#000',
            light: '#000',
            dark: '#000',
        }
	},
});

export {theme};