import React from 'react'
import './Auth.scss'

// Components
import Login from '../Login/Login'
import Register from '../Register/Register'

// MaterialUI
import PropTypes from 'prop-types';
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


const Auth = (props) => {

  const [value, setValue] = React.useState( retrieveIndex() );

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function retrieveIndex () {
    if (!props.location.state) {
      return 0;
    } else if (props.location.state.signIn) {
      return 1;
    } else {
      return 0;
    }
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