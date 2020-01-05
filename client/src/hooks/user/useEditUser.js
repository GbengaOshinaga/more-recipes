import { useAsync } from 'react-async';
import { api, logger } from '../../utils';

const editUser = async ([user, uploadedImage]) => {
  let imageUploadResponse;
  if (uploadedImage instanceof File) {
    imageUploadResponse = await api.uploadImage(uploadedImage);
  }

  if (imageUploadResponse) {
    const { secure_url: secureUrl } = imageUploadResponse;
    user.profilePic = secureUrl;
  }

  return api.editUser(user);
};

export default function useEditUser(onSuccess) {
  const onReject = async error => {
    logger('edit error', await error);
  };

  const onResolve = data => {
    onSuccess?.();
    logger('Edit onResolve', data);
  };

  const { isLoading, data, run } = useAsync({
    deferFn: editUser,
    onResolve,
    onReject
  });
  const user = data?.data?.user ?? {};

  return { isEditingUser: isLoading, editUser: run, updatedUser: user };
}
