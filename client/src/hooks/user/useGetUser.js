import { useAsync } from 'react-async';
import { api, log, logError } from '../../utils';

const getUser = ({ userId }) => api.getUser(userId);

export default function useGetUser(userId) {
  const onReject = async error => {
    logError(await error, 'get user error');
  };

  const { isLoading, data } = useAsync({
    promiseFn: getUser,
    userId,
    onReject
  });
  log('user data', data);

  const user = data?.data?.user ?? {};

  return { isFetchingUser: isLoading, user };
}
