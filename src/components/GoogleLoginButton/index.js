import React from 'react';

import { Spin } from 'antd';

import { GoogleAPI, GoogleLogin } from 'react-google-oauth';

import { GOOGLE_CLIENT_ID, GOOGLE_AUTH_SCOPE } from '../../constants/google';

const GoogleLoginButton = ({ loading, onLoginSuccess, onLoginFailure }) => (
  <div style={{ textAlign: 'center' }}>
    {
      loading ?
        <Spin size='large'/> :
        <GoogleAPI
          clientId={GOOGLE_CLIENT_ID}
          onUpdateSigninStatus={() => {}}
          onInitFailure={() => {}}
          scope={GOOGLE_AUTH_SCOPE.join(' ')}
          responseType='code'
          prompt='consent'
        >
          <GoogleLogin
            offline={true}
            prompt='consent'
            onLoginSuccess={onLoginSuccess}
            onLoginFailure={onLoginFailure}
            clientId={GOOGLE_CLIENT_ID}
            scope={GOOGLE_AUTH_SCOPE.join(' ')}
            responseType='code'
          />
        </GoogleAPI>
    }
  </div>
);

export default GoogleLoginButton;
