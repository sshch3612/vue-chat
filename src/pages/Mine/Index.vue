<template>
  <div class="mine">
    <mu-list textline="two-line">
      <mu-list-item avatar button :ripple="false" :key="index">
        <mu-list-item-content>
          <mu-list-item-title>头像</mu-list-item-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-avatar :size="42">
            <img :src="userInfo.avatar">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-button>
        </mu-list-item-action>
        <input class="mine-avatar" type="file" name="file" accept="image/*" @change="updateAvatar">
      </mu-list-item>
      <mu-list-item avatar button :ripple="false" :key="index">
        <mu-list-item-content>
          <mu-list-item-title>昵称</mu-list-item-title>
        </mu-list-item-content>
        <mu-list-item-action>{{userInfo.username}}</mu-list-item-action>
        <mu-list-item-action>
          <mu-button icon>
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-flex justify-content="center" align-items="center" style="margin-top:100px">
      <mu-button full-width large color="#f44336" @click="signout">账号退出</mu-button>
    </mu-flex>
  </div>
</template>
<script>
import Request from "@/axios/request";
import { fileUpload } from "@/axios/util";
export default {
  data: function() {
    return {
      // userInfo: this.$store.getters.userInfo
    };
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.getters.userInfo;
      }
    }
  },

  methods: {
    signout: async function() {
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
          this.$store.dispatch("changeUserinfo", {});
          this.$router.replace({ path: "/login" });
        }
      } catch (error) {}
    },
    updateAvatar: async function(event) {
      const imgfile = event.target.files[0];
      const _this = this;
      fileUpload(imgfile, async function(imgbase) {
        try {
          const token = localStorage.getItem("chat_token");
          const res = await Request({
            url: "updateAvatar",
            method: "post",
            headers: {
              token: token
            },
            data: {
              avatar: imgbase
            }
          });
          if (res.code === 200) {
            // this.$toast.message('账号退出')
            await _this.$store.dispatch("changeUserinfo", res.message);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  }
};
</script>
<style lang="less">
.mine {
  &-avatar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: 2;
  }
}
</style>

