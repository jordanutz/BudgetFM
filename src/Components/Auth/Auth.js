import React from 'react'
import './Auth.scss'

// Components
import Login from '../Login/Login'
import Register from '../Register/Register'

// MaterialUI
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    textColorPrimary: 'blue'  
  },

}));

const Auth = (props) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className="Auth classes.root">
      <div className="AuthModule">
        <section className="AuthTabs">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Register" />
            <Tab label="Sign In" />
          </Tabs>
        </section> 

        {value === 0 && <TabContainer><Register/></TabContainer>}
        {value === 1 && <TabContainer><Login /></TabContainer>}
      </div>
    </div>
  )
}


export default Auth