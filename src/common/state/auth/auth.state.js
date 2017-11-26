const token = localStorage.getItem("token");
const authState = {
  token: token,
  loggedInUser: null,
  loading: false,
  error: null,
  isAuthenticated: token ? true : false
};

export default authState;
