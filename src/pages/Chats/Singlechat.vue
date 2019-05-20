<template>
  <mu-container class="singlechat">
    <div class="msgcontent">
      <div class="msgcontent-wrap" ref="msgcontent">
        <Chatitem
          :key="index"
          v-for="(value,index) in receiveMsg"
          :direction="value.from===fromUser?'row-reverse':'row'"
        >
          <span v-if="value.type==='image'">
            <mu-paper class="msgimage" :z-depth="1">
              <img :src="value.message">
            </mu-paper>
          </span>
          <span v-else>{{value.message}}</span>
        </Chatitem>
      </div>
    </div>
    <div class="entry">
      <!-- <textarea ref="message" class="message"/> -->
      <mu-text-field
        class="entry-msg"
        v-model="sendmessage"
        multi-line
        :rows-max="4"
        solo
        full-width
      ></mu-text-field>
      <!-- <button v-on:click="sendMsg('text')" class="entryBtn">发送</button> -->
      <mu-button color="primary" @click="sendMsg('text')" round class="entryBtn">发送</mu-button>
    </div>
    <mu-container class="msg-iconset">
      <mu-button color="secondary" icon class="msg-album" style="margin:0 12px">
        <mu-icon value="collections" color="#757575" size="36"></mu-icon>
        <input
          class="msg-album-input"
          type="file"
          name="file"
          accept="image/*"
          @change="fileUpload"
        >
      </mu-button>
      <mu-button color="secondary" icon class="msg-photo" style="margin:0 12px">
        <mu-icon value="photo_camera" color="#757575" size="36"></mu-icon>
        <input
          class="msg-photo-input"
          type="file"
          name="file"
          accept="image/*"
          capture="camera"
          @change="fileUpload"
        >
        <!-- <input value='' accept="video/*" capture="user">  -->
      </mu-button>
    </mu-container>
  </mu-container>
</template>
<script>
import Chatitem from "@/components/Chatitem";
export default {
  data: function() {
    return {
      msg: 123,
      userId: null,
      msgType: "text",
      sendmessage: null,
      receiveMsg: [],
      fromUser: this.$store.state.userInfo.username,
      toUser: this.$route.params.userId
    };
  },
  // mounted() {
  //   console.log("mounted");
  //   // this.$socket.emit('registered',{userId:'test01'})
  // },
  components: {
    Chatitem
  },
  created() {
    this.$socket.emit("registered", {
      userId: this.$data.fromUser,
      status: 1,
      room: this.$data.toUser
    });
    this.$socket.emit("historyMsg", {
      from: this.$data.fromUser,
      to: this.$data.toUser
    });
  },
  updated: function() {
    console.info(44423323322);
    const ref = this.$refs.msgcontent;
    ref.scrollTop = ref.scrollHeight;
  },
  beforeDestroy() {
    this.$socket.emit("registered", {
      userId: this.$data.fromUser,
      status: 2
    });
  },
  sockets: {
    message: function(data) {
      console.log("ff", data);
      this.$data.msg = data;
    },
    historyMsg: function(msg) {
      this.$data.receiveMsg = [...this.$data.receiveMsg, ...msg["message"]];
    },
    registered: function(data) {
      console.log(data, 44);
    },
    singlechat: function(msg) {
      console.log(34545344, msg);
      this.$data.receiveMsg = [...this.$data.receiveMsg, msg];
    }
  },
  methods: {
    fileUpload: function(event) {
      const imgfile = event.target.files[0];
      const Reader = new FileReader();
      const _this = this;
      Reader.readAsDataURL(imgfile);
      Reader.onload = function() {
        console.log(this.result);
      };
      Reader.onerror = function() {};
      Reader.onloadend = function() {
        if (!this.error) {
          _this.$data.sendmessage = this.result;
          _this.sendMsg("image");
        }
      };
    },
    clearMsg: function() {
      this.$data.sendmessage = "";
    },
    scrollTobottom: function() {
      const ref = this.$refs.msgcontent;
      ref.scrollTop = ref.scrollHeight;
    },
    sendMsg: async function(msgType) {
      const type = msgType || "text";
      const Data = this.$data.sendmessage;
      const From = this.$data.fromUser;
      const To = this.$data.toUser;
      if (Data) {
        await this.$socket.emit("singlechat", {
          from: From,
          to: To,
          type: type,
          date: Date.now(),
          message: Data
        });
        this.clearMsg();
      }
    },
    test: function() {
      console.log(this, this.$socket);
      this.$socket.emit("message", "1111dff");
    },
    registered: function() {
      const userId = this.$refs.input.value;
      this.$data.userId = userId;
      this.$socket.emit("registered", { userId: userId });
    },
    online: function(data) {
      console.log(data);
    },
    addgroup: function() {
      const userId = this.$refs.input.value;
      this.$socket.emit("addgroup", { groupId: "10001", userId: userId });
    },
    sendGroupMsg: function() {
      const Data = this.$refs.groupmessage.value;
      this.$socket.emit("groupchat", { groupId: "10001", message: Data });
    }
  }
};
</script>
<style lang="less" scoped>
.singlechat {
  display: flex;
  flex-direction: column;
}
.msgcontent {
  flex: 1;
  overflow: hidden;
  .msgcontent-wrap {
    box-sizing: border-box;
    padding: 12px 8px 0;
    // padding: 0 8px;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .msgimage {
      width: 150px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
.entry {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  padding: 6px 10px;
  background-color: #999;
  .entry-msg {
    margin: 0;
    padding: 6px 4px;
    min-height: 42px;
    flex: 1;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    // &:focus{
    //   outline: none;
    // }
  }
  .entryBtn {
    margin-left: 10px;
    height: 42px;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    // border-radius: 8px;
  }
}
.msg-iconset {
  height: 44px;
  .msg-album {
    position: relative;
    &-input {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
    }
  }
  .msg-photo {
    position: relative;
    &-input {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      opacity: 0;
    }
  }
}
</style>
