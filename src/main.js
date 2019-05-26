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
import "muse-ui-message/dist/muse-ui-message.css";
import Message from "muse-ui-message";
import store from "./store";
import { baseURL } from "@/config/config.default";

Vue.prototype.baseURL = baseURL;
Vue.config.productionTip = false;

Vue.use(MuseUI);
Vue.use(Toast);
Vue.use(Message);
Vue.use(
  new VueSocketio({
    debug: true,
    connection: baseURL

    // options: { path: "/" }
  })
);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
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
