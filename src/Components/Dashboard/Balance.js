import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import CurrentDate from '../../Utils/CurrentDate'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Balance(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
    { props.currency } 3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {CurrentDate()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}