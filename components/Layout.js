import React from 'react';
import "../styles/Layout.module.css";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Layout({children}) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            FAKE CRUD
          </Typography>
          <div >
            <Button color="inherit" onClick={()=>router.push("/")}>Home</Button>
            <Button color="inherit" onClick={()=>router.push("/posts")}>Posts</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}