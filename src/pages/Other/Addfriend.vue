<template>
  <div>
    <mu-container>
      <mu-text-field v-model="dataSearch" placeholder="昵称搜索" full-width></mu-text-field>
    </mu-container>
    <mu-list v-if="dataSearch!=''">
      <mu-list-item avatar button :ripple="false" @click="getUserinfo">
        <mu-list-item-action>
          <mu-avatar></mu-avatar>
        </mu-list-item-action>
        <mu-list-item-title>搜索：{{dataSearch}}</mu-list-item-title>
      </mu-list-item>
    </mu-list>
    <mu-container v-if="userInfo!=null">
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <mu-card-header title="昵称" :sub-title="userInfo.username">
          <mu-avatar slot="avatar">
            <img :src="userInfo.avatar">
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>
        <mu-card-actions>
          <mu-button full-width color="primary" @click="addFriend">添加</mu-button>
        </mu-card-actions>
      </mu-card>
    </mu-container>
  </div>
</template>

<script>
import Request from "@/axios/request";
export default {
  data: function() {
    return {
      dataSearch: "",
      userInfo: null
    };
  },
  sockets: {
    addfriend: function(msg) {
      // if (msg.code === 200) {
      this.$alert(msg.message, null, { okLabel: "我知道了" });
      // }
    }
  },
  methods: {
    async getUserinfo() {
      const res = await Request({
        url: "getUser",
        method: "post",
        headers: {
          token: localStorage.getItem("chat_token")
        },
        data: {
          touser: this.$data.dataSearch
        }
      });
      if (res.code === 200) {
        this.$data.userInfo = res.message;
      } else {
        this.$alert(res.message, null, { okLabel: "我知道了" });
      }
    },
    async addFriend() {
      this.$socket.emit("addfriend", {
        from: this.$store.state.userInfo.username,
        to: this.$data.dataSearch
      });
    }
  }
};
</script>
<style lang="less">
</style>
