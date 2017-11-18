const authState = {
    token: localStorage.getItem("work_force_token"),
    loggedInUser: null,
    loading: false,
    error: null
  };
  
  export default authState;