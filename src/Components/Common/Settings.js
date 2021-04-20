import React, { useEffect, useState } from 'react'
import Navbar from '../Common/Navbar'
import firebase from '../firebase'
import Footer from '../Common/Footer'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { CustomDialog } from './CustomDialog';

const currencies = [
    {
      value: '$',
      label: '$ - US Dollars',
    },
    {
      value: '€',
      label: '€ - Euros',
    },
    {
      value: '฿',
      label: '฿ - Bitcoin',
    },
    {
      value: '₹',
      label: '₹ - Indian Rupee',
    },
  ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 450,
  },
  greet: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    paddingTop: '2em',
  },
  saveButton: {
    bottom: 0,
    display: 'flex',
    margin: '2em 0',
  },
  textInput: {
    marginTop: '1em',
  },
}));

function Settings() {
  const classes = useStyles();
  let history = useHistory();

  const [currency, setCurrency] = useState('');
  const handleCurrencyChange = (event) => {setCurrency(event.target.value)};
  
  const [userName, setUserName] = useState('')

  useEffect(() => {
    firebase.getCurrentUsername().then(setUserName)
    firebase.getCurrency().then(setCurrency)
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const handleDialogOpen = () => {setIsOpen(true)}
  const handleDialogClose = () => {setIsOpen(false)}

  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogBody, setDialogBody] = useState('')

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if(!firebase.getAuthStatus()) {
    alert('Please Login First')
    history.push('/')
    return null
  }

  return(
    <div className={classes.root}>
    <CssBaseline />
    <Navbar title='Settings' />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={9}>
              <Paper className={fixedHeightPaper}>
              <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Currency"
          value={currency}
          onChange={handleCurrencyChange}
          helperText="Please select your currency"
          variant="outlined"
          className={classes.textInput}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        <div>
        <TextField
          id="user-name"
          label="Full Name"
          variant="outlined"
          helperText="Please enter your full name"
          className={classes.textInput}
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        </div>
        <div>
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.saveButton}
        startIcon={<SaveIcon />}
        onClick={settingsSave}
      >
        Save
      </Button>
            </div>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>

      <CustomDialog isOpen={isOpen} handleClose={handleDialogClose} title={dialogTitle} body={dialogBody}></CustomDialog>
      </main>
    </div>
  );

  async function settingsSave() {
    try {
        await firebase.setCurrency(currency)
        await firebase.setUserName(userName)
        setDialogTitle('Successful');
        setDialogBody('Settings Saved Successfully!');
        handleDialogOpen()
    } catch(e) {
        setDialogTitle('Error');
        setDialogBody(String(e.message));
        handleDialogOpen()
    }
  }
}

export default Settings