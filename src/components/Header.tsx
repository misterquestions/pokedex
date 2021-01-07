import React from 'react';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Controller, useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    navigation: {
      display: 'flex',
      alignItems: 'center',
    },
    backIcon: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    logo: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        height: theme.spacing(8),
        padding: theme.spacing(1),
        cursor: 'pointer',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

interface SearchForm {
  search: string;
}

const Header: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const { control, handleSubmit } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    if (data.search.length !== 0) {
      router.push(`/pokemon/${data.search}`);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <div className={classes.navigation}>
              <img className={classes.logo} src="/assets/logo.svg" alt="logo" />
              {router.pathname !== '/' && <ArrowBackIcon className={classes.backIcon} />}
            </div>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="search"
                control={control}
                defaultValue=""
                as={
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                }
              />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="app-header-anchor" />
    </div>
  );
};

export default Header;
