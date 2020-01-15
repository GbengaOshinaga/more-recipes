import { useAsync } from 'react-async';
import { api, log, logError } from '../../utils';

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
    logError(await error, 'edit user error');
  };

  const onResolve = data => {
    onSuccess?.();
    log('Edit onResolve', data);
  };

  const { isLoading, data, run } = useAsync({
    deferFn: editUser,
    onResolve,
    onReject
  });
  const user = data?.data?.user ?? {};

  return { isEditingUser: isLoading, editUser: run, updatedUser: user };
}
