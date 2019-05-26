<template>
  <div id="app">
    <mu-appbar style="width: 100%;" color="primary" v-if="topbar" v-model="topbar">
      <mu-button icon slot="left" v-if="topbar.showreturn" @click="$router.go(-1)">
        <mu-icon value="keyboard_arrow_left" size="34"></mu-icon>
      </mu-button>
      <div style="text-align:center">{{topbar.title}}</div>
      <mu-menu slot="right" v-if='topbar.menu'>
        <mu-button flat color="primary">
          <mu-icon value="add_circle_outline"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button to="/addfriend">
            <mu-list-item-content>
              <mu-list-item-title>添加好友</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>Menu Item 2</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <router-view class="app-content"></router-view>
    <Bottomtab class="app-bottom" v-if="bottomtab" v-model="bottomtab"/>
  </div>
</template>

<script>
import Bottomtab from "@/components/Bottomtab";
export default {
  name: "App",
  data() {
    return {
      topbar: this.$route.meta.topbar,
      bottomtab: this.$route.meta.bottomtab
    };
  },
  components: {
    Bottomtab
  },
  sockets: {
    connect: function(data) {
      this.$socket.emit("registered", {
        userId: this.$store.getters.userInfo.username,
        status: 3
      });
    }
  },
  methods: {
    showHide: function() {
      this.show = !this.show;
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from, 444444);
      this.$data.topbar = to.meta.topbar;
      this.$data.bottomtab = to.meta.bottomtab;
      if (to.name === "chatuser") {
        if (this.$data.topbar) {
          this.$data.topbar["title"] = to.params["userId"];
        } else {
          this.$data.topbar = { title: to.params["userId"] };
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}
.app-content {
  flex: 1;
  // position: absolute;
  // left:0;
  // top:0;
  // height: 100%;
  // width:100%;
}
</style>

