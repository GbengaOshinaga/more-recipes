import { sessionService } from 'redux-react-session';

export const saveUserAndRedirect = async ({ location, history, response }) => {
  await sessionService.saveSession(response?.data?.token);
  await sessionService.saveUser(response?.data?.user);

  const { state: { from } = { from: { pathname: '/' } } } = location;
  history.replace(from);
};
