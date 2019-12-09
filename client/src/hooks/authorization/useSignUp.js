import { useAsync } from 'react-async';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { api, logger } from '../../utils/index';
import { saveUserAndRedirect } from './utils';

const post = ([data]) => api.signUp(data);

function useSignUp() {
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  const onSuccess = async response => {
    logger('success signup response', response);
    await saveUserAndRedirect({ location, history, response });
  };

  const onReject = async errorData => {
    const resolvedData = await errorData;
    const message =
      resolvedData?.data?.errors?.[0]?.msg || resolvedData.message;
    logger('error data', resolvedData);
    addToast(message, { appearance: 'error' });
  };

  const { run } = useAsync({ deferFn: post, onResolve: onSuccess, onReject });

  return { signUp: run };
}

export default useSignUp;
