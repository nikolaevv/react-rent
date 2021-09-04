import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    appBar: {
      background: '#49535c !important',
      boxShadow: 'none !important',
      paddingTop: theme.spacing(2),
      paddingLeft: 0,
      marginBottom: theme.spacing(5),
      display: 'flex',
      alignContent: 'center',
      paddingBottom: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default useStyles;