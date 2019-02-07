import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import { Layout } from 'antd';

import { isAuthenticated } from './util/user';

import LoginScreen from './screens/LoginScreen';

const { Content, Header } = Layout;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const NotFound = () => (
  <div>404</div>
);

const ServerError = () => (
  <div>500</div>
);

const Index = () => (
  <div>Hi!</div>
);

const HeaderMenu = () => (
  <Header style={{ backgroundColor: '#ffffff' }}>
    <Link to='/'>
      <div style={{ float: 'left', color: '#000000' }}><b>React Template</b></div>
    </Link>
  </Header>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout style={{ height: '100vh' }}>
          <HeaderMenu/>
          <Content style={{ padding: 48 }}>
            <Switch>
              <Route exact path='/404' component={NotFound}/>
              <Route exact path='/500' component={ServerError}/>

              <Route exact path='/login' component={LoginScreen}/>

              <PrivateRoute exact path='/' component={Index}/>
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
