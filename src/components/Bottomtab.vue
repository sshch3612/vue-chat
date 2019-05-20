<template>
  <mu-bottom-nav :value.sync="shift">
    <mu-bottom-nav-item value='chatlist' title="聊天" to="/chatlist" replace icon="restore"></mu-bottom-nav-item>
    <mu-bottom-nav-item value='addrbook' title="通讯录" icon="favorite" to="/addrbook" replace></mu-bottom-nav-item>
    <mu-bottom-nav-item value='mine' title="我" icon="location_on" replace to="/mine"></mu-bottom-nav-item>
  </mu-bottom-nav>
</template>

<script>
export default {
  name: "Bottomtab",
  data () {
    return {
      shift: 'chalist'
    }
  },
  methods: {
    goCagetory: function(index) {
      console.log(index);
      this.$router.replace({ path: "/category" });
    },
    goHome: function() {
      this.$router.replace({ path: "/" });
    }
  }
};
</script>

<style lang="less" scoped>
.tab-bar {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
