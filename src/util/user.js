import store from 'store';

import { isEmpty } from 'lodash/lang';

export const isAuthenticated = () => {
  return !isEmpty(store.get('accessToken'))
          && !isEmpty(store.get('refreshToken'))
          && typeof store.get('userId') === 'number';
};
