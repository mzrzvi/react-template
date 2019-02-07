import React from 'react';

import LoginForm from '../../components/LoginForm';

class LoginScreen extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center', maxWidth: 450, margin: 'auto' }}>
        <LoginForm {...this.props}/>
      </div>
    );
  }
}

export default LoginScreen;
