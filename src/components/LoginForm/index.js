import React from 'react';

import { Redirect } from 'react-router-dom';

import { Card, Form, Icon, Input, Button, Divider, message } from 'antd';

import GoogleLoginButton from '../GoogleLoginButton';

import store from 'store';

import { login, loginWithGoogle } from '../../api/auth';

class LoginForm extends React.Component {

  state = {
    redirectToReferrer: false,
    loading: false,
    googleLoading: false
  };

  _emailLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true }, () => {
          login(values).then((res) => {
            store.set('accessToken', res.data.app_access_token);
            store.set('refreshToken', res.data.app_refresh_token);
            store.set('userId', res.data.user_id);
            store.set('userInfo', res.data.user_info);
            this.setState({ loading: false, redirectToReferrer: true });
          }).catch((error) => {
            message.error(error.response.data.error);
            this.setState({ loading: false })
          });
        })
      }
    });
  }

  _googleLoginSuccess = (googleRes) => {
    this.setState({ googleLoading: true }, () => {
      loginWithGoogle(googleRes).then((res) => {
        store.set('accessToken', res.data.app_access_token);
        store.set('refreshToken', res.data.app_refresh_token);
        store.set('userId', res.data.user_id);
        store.set('userInfo', res.data.user_info);
        this.setState({ googleLoading: false, redirectToReferrer: true });
      }).catch((error) => {
        message.error(error.response.data.error);
        this.setState({ googleLoading: false });
      });
    });
  }

  _googleLoginError = (error) => message.error(error.error)

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer, loading, googleLoading } = this.state;

    const { getFieldDecorator } = this.props.form;

    if (redirectToReferrer) {
      return (<Redirect to={from}/>);
    }

    return (
      <Card style={{ padding: 50 }}>
        <h1 style={{ color: 'gray' }}>Login</h1>
        <div style={{ maxWidth: 300, margin: 'auto' }}>
          <Form onSubmit={this._emailLogin}>
            <Form.Item>
              {
                getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(
                  <Input
                    prefix={<Icon
                    type='user'
                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='Email'
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon
                    type='lock'
                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type='password'
                    placeholder='Password'
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Divider>or</Divider>
          <GoogleLoginButton
            loading={googleLoading}
            onLoginSuccess={this._googleLoginSuccess}
            onLoginFailure={this._googleLoginError}
          />
        </div>
      </Card>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;
