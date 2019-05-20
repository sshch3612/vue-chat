<template>
  <div class="mine">
    <mu-list textline="two-line">
      <mu-list-item
        avatar
        button
        v-model="user"
        :ripple="false"
        v-for="(value,index) in user"
        :key="index"
      >
        <mu-list-item-content>
          <mu-list-item-title>{{value['key']}}</mu-list-item-title>
        </mu-list-item-content>
        <mu-list-item-action>{{value['value']}}</mu-list-item-action>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-flex justify-content="center" align-items="center" style="margin-top:100px">
      <mu-button full-width large color="#f44336"  @click="signout">账号退出</mu-button>
    </mu-flex>
  </div>
</template>
<script>
import Request from "@/axios/request";
export default {
  data: function() {
    return {
      user: [
        {
          key: "头像",
          value: this.$store.state.userInfo.avatar
        },
        {
          key: "昵称",
          value: this.$store.state.userInfo.username
        }
      ]
    };
  },
  methods: {
    async signout() {
      try {
        const token = localStorage.getItem("chat_token");
        const res = await Request({
          url: "singout",
          method: "get",
          headers: {
            token: token
          }
        });
        if (res.code === 200) {
          // this.$toast.message('账号退出')
          this.$store.dispatch("changeUserinfo",{});
          this.$router.replace({path:'/login'})
        }
      } catch (error) {}
    }
  }
};
</script>

<style lang="less">
</style>

