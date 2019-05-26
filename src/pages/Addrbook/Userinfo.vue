<template>
  <!-- <mu-list>
    <mu-list-item avatar button :ripple="false" three-line>
      <mu-list-item-action>
        <mu-avatar>
          <img :src="baseURL+'userAvatar/'+$route.params.userinfo">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-content>
        <mu-list-item-title>
          <h2>{{userInfo.username}}</h2>
        </mu-list-item-title>
        <mu-list-item-title>昵称：</mu-list-item-title>
        <mu-list-item-title>地区</mu-list-item-title>
      </mu-list-item-content>
    </mu-list-item>
  </mu-list>-->
  <mu-container>
    <mu-card style="width: 100%;margin: 0 auto;">
      <mu-card-header title="昵称" :sub-title="userInfo.username">
        <mu-avatar slot="avatar">
          <img :src="baseURL+'userAvatar/'+$route.params.userinfo">
        </mu-avatar>
      </mu-card-header>
      <mu-card-text>水至清则无鱼，人至察则无友，世间本无事，庸人自扰之，自勉之</mu-card-text>
      <mu-card-actions>
        <mu-button full-width color="primary" @click="jumptoMsg">发消息</mu-button>
      </mu-card-actions>
    </mu-card>
  </mu-container>
</template>
<script>
import Request from "@/axios/request";
export default {
  data: function() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.getUserinfo();
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
          touser: this.$route.params.userinfo
        }
      });
      if (res.code === 200) {
        this.$data.userInfo = res.message;
      }
    },
    jumptoMsg() {
      this.$router.replace({
        path: `/chatlist/${this.$data.userInfo.username}`
      }); //path: "/chatlist/:userId",
    }
  }
};
</script>
<style lang="less">
</style>

