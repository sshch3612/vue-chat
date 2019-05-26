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

function dataURLtoBlob(base64){
  var base64Arr = base64.split(',');
  var imgtype = '';
  var base64String = '';
  if(base64Arr.length > 1){
      //如果是图片base64，去掉头信息
      base64String = base64Arr[1];
      imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
   // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);
  
  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
      byteArray[i] = bytes.charCodeAt(i);
  }
 
  // 生成Blob对象（文件对象）
  return new Blob( [bytesCode] , {type : imgtype});
};
