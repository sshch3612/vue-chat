<template>
  <mu-list>
    <mu-list-item avatar button :ripple="false" three-line >
      <mu-list-item-action>
        <mu-avatar></mu-avatar>
      </mu-list-item-action>
      <mu-list-item-content>
        <mu-list-item-title>
          <h2>{{userInfo.username}}</h2>
        </mu-list-item-title>
        <mu-list-item-title>昵称：</mu-list-item-title>
        <mu-list-item-title>地区</mu-list-item-title>
      </mu-list-item-content>
    </mu-list-item>
  </mu-list>
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
          token: this.$store.state.token
        },
        data: {
          touser: this.$route.params.userinfo
        }
      });
      if (res.code === 200) {
        this.$data.userInfo = res.message;
      }
    }
  }
};
</script>
<style lang="less">
</style>

