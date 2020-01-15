import { useAsync } from 'react-async';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { api, log, logError } from '../../utils';
import { saveAuthAndRedirect } from './utils';

const post = ([data]) => api.signUp(data);

function useSignUp() {
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToasts();

  const onSuccess = async response => {
    log('success signup response', response);
    const { data: { user: { id } = {} } = {} } = response;
    await saveAuthAndRedirect({ location, history, userId: id });
  };

  const onReject = async errorData => {
    const resolvedData = await errorData;
    const message =
      resolvedData?.data?.errors?.[0]?.msg || resolvedData.message;
    logError(resolvedData, 'Error in Sign up');
    addToast(message, { appearance: 'error' });
  };

  const { isLoading, run } = useAsync({
    deferFn: post,
    onResolve: onSuccess,
    onReject
  });

  return { signUp: run, isSigningUp: isLoading };
}

export default useSignUp;
