
<template>
  <div class="chatitem" :style="{'flex-direction':direction}">
    <div :class="['chat-avatar',direction==='row-reverse'?'chat-avatar-right':'chat-avatar-left']">
      <mu-avatar size="42">
        <img :src="avatar">
      </mu-avatar>
    </div>
    <div :class="['chat-msg',direction==='row-reverse'?'chat-msg-right':'chat-msg-left']">
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "chatitem",
  props: {
    direction: {
      type: String,
      default: function() {
        return "row";
      }
    },
    avatar: {
      type: String,
      default: function() {
        return "https://upload.jianshu.io/users/upload_avatars/7072486/058e8c2c-2cf7-430b-b652-a223b7244c11";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.chatitem {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 12px;
  .chat-avatar {
    box-sizing: border-box;
    &-left {
      padding-right: 15px;
    }
    &-right {
      padding-left: 15px;
    }
  }
  .chat-msg {
    &-left {
      padding-right: 57px;
      position: relative;
      & > span {
        background-color: #bbdefb;
      }
      &::before {
        content: "";
        display: inline-block;
        height: 10px;
        width: 10px;
        position: absolute;
        top: 21px;
        left: -8px;
        background-color: #bbdefb;
        transform: rotate(45deg) translateY(-50%);
      }
    }
    &-right {
      padding-left: 57px;
      position: relative;
      & > span {
        background-color: #ffa726;
      }
      &::after {
        content: "";
        display: inline-block;
        height: 10px;
        width: 10px;
        position: absolute;
        top: 21px;
        right: -2px;
        background-color: #ffa726;
        transform: rotate(45deg) translateY(-50%);
      }
    }
    & > span {
      display: inline-flex;
      border-radius: 10px;
      align-items: center;
      box-sizing: border-box;
      min-height: 42px;
      padding: 8px 12px;
      line-height: 1.5;
      font-size: 16px;
    }
  }
}
</style>

