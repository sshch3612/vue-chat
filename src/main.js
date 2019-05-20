// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueSocketio from "vue-socket.io";
import "../static/mobile_normalize.css";
import MuseUI from "muse-ui";
import Toast from "muse-ui-toast";
import "muse-ui/dist/muse-ui.css";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(MuseUI);
Vue.use(Toast);
Vue.use(
  new VueSocketio({
    debug: true,
    connection: "http://192.168.123.129:7001/",
    
    // options: { path: "/" }
  })
);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  // sockets: {
  //   connect: function(data) {
  //   },
  //   customEmit: function(data) {
  //     // alert(data, 4455)
  //   },
  //   disconnect: function() {
  //     console.log(4566677);
  //   },
  //   res: function(data) {
  //     // alert(data, 4555)
  //   }
  // }
});
