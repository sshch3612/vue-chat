import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Chatlist from "@/pages/Chats/Chatlist";
import Singlechat from "@/pages/Chats/Singlechat";
import Login from "@/pages/Login/Registered";
import Mine from "@/pages/Mine/Index";
import Addrbook from "@/pages/Addrbook/Index";
import Addfriend from "@/pages/Other/Addfriend";
import Userinfo from '@/pages/Addrbook/Userinfo';
import { loggedIn } from "../axios/util";

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/", redirect: "/chatlist" },
    {
      path: "/chatlist",
      name: "chatlist",
      component: Chatlist,
      meta: {
        bottomtab: true,
        topbar: {
          title: "聊天"
        }
      }
    },
    {
      path: "/mine",
      name: "mine",
      component: Mine,
      meta: {
        bottomtab: true,
        topbar: {
          title: "我"
        }
      }
    },
    {
      path: "/chatlist/:userId",
      name: "chatuser",
      component: Singlechat,
      meta: {
        topbar: {
          showreturn:true
        }
      }
      
    },
    {
      path: "/addrbook",
      name: "addrbook",
      component: Addrbook,
      meta: {
        bottomtab: true,
        topbar: {
          title: "通讯录"
        }
      }
    },
    {
      path: "/addrbook/:userinfo",
      name: "userinfo",
      component: Userinfo,
      meta: {
        topbar: {
          showreturn:true
        }
      }
      
    },
    {
      path: "/addfriend",
      name: "addfriend",
      component: Addfriend
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  console.info(to, to.matched, 655555555);
  if (to.matched.some(record => record.name === "login")) {
    // next({name:'chatlist',path:'/chatlist'});
    next();
  } else {
    if (await loggedIn()) {
        next();
    } else {
      next({ name: "login", path: "/login" });
    }
  }
});

export default router;
