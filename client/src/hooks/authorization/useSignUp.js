import { useAsync } from 'react-async';
import { useHistory, useLocation } from 'react-router-dom';

import { api, logger } from '../../utils/index';
import { saveUserAndRedirect } from './utils';

const post = ([data]) => api.signUp(data);

function useSignUp() {
  const location = useLocation();
  const history = useHistory();

  const onSuccess = async response => {
    logger('success signup response', response);
    await saveUserAndRedirect({ location, history, response });
  };

  const onReject = async data => {
    logger('error data', await data);
  };

  const { run } = useAsync({ deferFn: post, onResolve: onSuccess, onReject });

  return { signUp: run };
}

export default useSignUp;
