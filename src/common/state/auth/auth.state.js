const authState = {
    token: localStorage.getItem("token"),
    loggedInUser: null,
    loading: false,
    error: null,
    isAuthenticated: localStorage.getItem('token') ? true : false
  };
  
  export default authState;