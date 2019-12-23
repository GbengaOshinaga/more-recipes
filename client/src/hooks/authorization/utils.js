export const saveAuthAndRedirect = async ({ location, history, userName }) => {
  const { state: { from } = { from: { pathname: '/catalog' } } } = location;
  const { localStorage } = window;
  localStorage.setItem('isAuthenticated', true);
  localStorage.setItem('userName', userName);
  history.replace(from);
};

export const removeAuth = () => {
  const { localStorage } = window;
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userName');
};
