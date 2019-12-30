import { useAsync } from 'react-async';

import { api } from '../../utils/index';
import { removeAuth } from './utils';

const signOut = () => {
  removeAuth();
  return api.signOut();
};

function useSignOut() {
  const { run } = useAsync({ deferFn: signOut });

  return { signOut: run };
}

export default useSignOut;
