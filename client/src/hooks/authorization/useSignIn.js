import { useAsync } from 'react-async';
import { useHistory, useLocation } from 'react-router-dom';

import { api, logger } from '../../utils/index';
import { saveUserAndRedirect } from './utils';

const post = ([credentials]) => api.signIn(credentials);

function useSignIn() {
  const location = useLocation();
  const history = useHistory();

  const onSuccess = async response => {
    logger('success signin response', response);
    await saveUserAndRedirect({ location, history, response });
  };

  const onReject = async data => {
    logger('error data', await data);
  };

  const { run } = useAsync({ deferFn: post, onResolve: onSuccess, onReject });

  return { signIn: run };
}

export default useSignIn;
