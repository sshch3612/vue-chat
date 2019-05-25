<template>
  <div class="home">
    <mu-list textline="two-line">
      <div v-for="(value,index) in userlist" v-bind:key="index">
        <mu-list-item avatar button :ripple="false" v-bind:to="'/chatlist/'+ index">
          <mu-list-item-action>
            <mu-avatar>
              <mu-icon size="36" value=":mudocs-icon-custom-github"></mu-icon>
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{value.username}}</mu-list-item-title>
            <mu-list-item-sub-title v-if="value.type==='image'">[图片]</mu-list-item-sub-title>
            <mu-list-item-sub-title v-else-if="value.type==='text'">{{value.message}}</mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-after-text>{{ new Date(Number(value.date)).toLocaleString()}}</mu-list-item-after-text>
            <mu-badge
              style="top:-10px"
              v-if="value.count"
              v-bind:content="value.count"
              circle
              color="#f44336"
            ></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
    <router-view/>
  </div>
</template>
<script>
import { Cell, Group } from "vux";
import HelloWorld from "@/components/HelloWorld";
export default {
  // sockets: {
  //   connect: function () {
  //     console.log('1111111')
  //   }
  // },
  data: function() {
    return {
      userlist: {}
    };
  },
  components: {
    // HelloWorld,
  },
  created() {
    this.$socket.emit("userlist", {
      from: this.$store.state.userInfo["username"]
    });
  },
  sockets: {
    userlist: function(data) {
      const Obj = {};
      for (const item of data.message) {
        // const parseitem = JSON.parse(item);
        Obj[item["username"]] = item;
      }
      this.$data.userlist = Obj;
      console.log(Obj, 744444);
      // data.message;
    },
    singlechatOut: function(data) {
      const { from, date, count, message, type } = data;
      this.$set(this.userlist, from, {
        ...this.$data.userlist[from],
        type: type,
        message: message,
        count: count,
        date: date
      });
    }
  },
  methods: {
    registered: async function() {
      const userId = this.$refs.input.value;
      this.$data.userId = userId;
      // this.$socket.emit("registered", { userId: userId });
      await this.$store.dispatch("changeUserinfo", { username: userId });
      await this.$socket.emit("registered", {
        userId: userId,
        status: 1
      });
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
