import store from "../store";
import Request from "./request";

export async function loggedIn() {
  const { islogin, userInfo } = store.state;
  if (islogin && userInfo.username) {
    return true;
  } else {
    const token = localStorage.getItem("chat_token");
    const res = await Request({
      url: "getUser",
      method: "get",
      headers:{
        token:token
      }
    });
    if(res.code === 200){
      store.state.islogin = true;
      store.state.userInfo = res.message || {};
      return true;
    }else{
      return false;
    }
  }
}
