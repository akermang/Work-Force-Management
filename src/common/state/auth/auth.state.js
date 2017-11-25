const token =   localStorage.getItem("token")
console.log("token: " + token)
const authState = {
    token: token,
    loggedInUser: null,
    loading: false,
    error: null,
    isAuthenticated: true
  };
  
  export default authState;