import { useAsync } from 'react-async';
import { api, logger } from '../../utils';

const getUser = ({ userId }) => api.getUser(userId);

export default function useGetUser(userId) {
  const onReject = async error => {
    logger('edit error', await error);
  };

  const { isLoading, data } = useAsync({
    promiseFn: getUser,
    userId,
    onReject
  });
  logger('user data', data);

  const user = data?.data?.user ?? {};

  return { isFetchingUser: isLoading, user };
}
