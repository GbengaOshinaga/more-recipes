import useGetUser from './useGetUser';
import useEditUser from './useEditUser';
import { decode } from '../../utils';

export default function useUser(userId, onEditSuccess) {
  const { isFetchingUser, user } = useGetUser(userId);
  const { isEditingUser, editUser, updatedUser = {} } = useEditUser(
    onEditSuccess
  );

  const data = { ...user, ...updatedUser };
  const decodedData = {
    ...data,
    firstName: decode(data.firstName),
    lastName: decode(data.lastName),
    about: decode(data.about),
    profilePic: decode(data.profilePic)
  };

  return { isFetchingUser, isEditingUser, editUser, user: decodedData };
}
