export const saveAuthAndRedirect = async ({ location, history, userId }) => {
  const { state: { from } = { from: { pathname: '/catalog' } } } = location;
  const { localStorage } = window;
  localStorage.setItem('isAuthenticated', true);
  localStorage.setItem('userId', userId);
  history.replace(from);
};

export const removeAuth = () => {
  const { localStorage } = window;
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userId');
};
