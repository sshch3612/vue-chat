<template>
  <div class="home">
    <mu-list textline="two-line">
      <div v-for="(value,index) in friendsUser" v-bind:key="index">
        <mu-list-item avatar button :ripple="false" v-bind:to="'/addrbook/'+ value.username">
          <mu-list-item-action>
            <mu-avatar>
              <img :src="baseURL+'userAvatar/'+value.username">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{value.username}}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
    <router-view/>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      friendsUser: []
    };
  },
  created() {
    console.log(this.baseURL,5555);
    this.$socket.emit("friendsUser", {
      username: this.$store.state.userInfo["username"]
    });
  },
  sockets: {
    friendsUser: function(msg) {
      this.$data.friendsUser = msg.message;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  // background-color:red;
}
.registered {
  // min-height: 34px;
  // width:42px;
  // margin-bottom: 12px;
  // color:red;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  margin-bottom: 15px;
  margin-top: 15px;
  border: none;
  &:focus {
    outline: none;
  }
  .registered-info {
    flex: 3;
    padding: 10px 0;
    border: 1px solid #666;
  }
  .registered-btn {
    flex: 1;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
