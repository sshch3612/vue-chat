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
      headers: {
        token: token
      }
    });
    if (res.code === 200) {
      store.state.islogin = true;
      store.state.userInfo = res.message || {};
      return true;
    } else {
      return false;
    }
  }
}

export function fileUpload(file,callback) {
  const imgfile = file;
  const Reader = new FileReader();
  const image = new Image();
  Reader.readAsDataURL(imgfile);
  Reader.onload = function() {
    // console.log(this.result);
  };
  Reader.onerror = function() {};
  Reader.onloadend = function() {
    if (!this.error) {
      image.src = this.result;
    }
  };
  image.onload = function() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    // 图片原始尺寸
    const originWidth = this.width;
    const originHeight = this.height;
    // 最大尺寸限制
    const maxWidth = 200;
    const maxHeight = 200;
    // // 目标尺寸
    let targetWidth = originWidth;
    let targetHeight = originHeight;
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(originHeight * (maxWidth / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(originWidth * (maxHeight / originHeight));
      }
    }
    // canvas对图片进行压缩
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(image, 0, 0, targetWidth, targetHeight);
    const compressResult = canvas.toDataURL("image/png", 0.2); //base64 格式
    callback(compressResult)
  };
}
