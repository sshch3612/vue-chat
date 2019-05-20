<template>
  <div>
    <mu-container>
      <mu-text-field v-model="dataSearch" label="Full Width" full-width></mu-text-field>
    </mu-container>
    <mu-list v-if="dataSearch!=''">
      <mu-list-item avatar button :ripple="false" @click="addFriend">
        <mu-list-item-action>
          <mu-avatar></mu-avatar>
        </mu-list-item-action>
        <mu-list-item-title>搜索：{{dataSearch}}</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import Request from "@/axios/request";
export default {
  data: function() {
    return {
      dataSearch: ""
    };
  },
  sockets:{
    addfriend:function(msg){
      if(msg.code === 200){
        this.$toast.message('好友添加成功')
      }
    }
  },
  methods: {
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
