<template>
  <mu-container class="registed">
    <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-form-item prop="username" :rules="usernameRules">
        <mu-text-field
          type="text"
          placeholder="用户名"
          v-model="validateForm.username"
          prop="username"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="password" :rules="passwordRules">
        <mu-text-field
          :type="visibility ? 'text' : 'password'"
          placeholder="密码"
          v-model="validateForm.password"
          prop="password"
          :action-icon="visibility ? 'visibility_off' : 'visibility'"
          :action-click="() => (visibility = !visibility)"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <mu-button full-width round color="primary" @click="submit">登陆</mu-button>
        <!-- <mu-button color="primary" @click="submit">登陆</mu-button> -->
        <mu-button full-width round @click="registed">我要注册</mu-button>
      </mu-form-item>
      <span>注:登陆、注册公用此页面</span>
    </mu-form>
  </mu-container>
</template>
<script>
import Request from "@/axios/request";
export default {
  data() {
    return {
      visibility: false,
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(async result => {
        if (result) {
          const _this = this;
          const res = await Request({
            url: "login",
            method: "post",
            data: { ..._this.$data.validateForm }
          });
          if (res.token && res.code === 200) {
            localStorage.setItem("chat_token", res.token);
            //登陆之后进行注册
            this.$socket.emit("registered", {
              userId: this.$data.validateForm.username,
              status: 2
            });
            //登陆成功之后，跳转到 chatlist页面
            this.$router.replace({ name: "chatlist", path: "/chatlist" });
          } else {
            this.$toast.message(res.message);
          }
        }
      });
    },
    registed() {
      const _this = this;
      this.$refs.form.validate().then(async result => {
        if (result) {
          const res = await Request({
            url: "registered",
            method: "post",
            data: { ..._this.$data.validateForm }
          });
          _this.$alert(res.message, null,{okLabel:'我知道了'});
        }
      });
    }
  }
};
</script>
<style>
.registed {
  /* position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; */
  display: flex;
  justify-content: center;
}
.mu-demo-form {
  width: 100%;
  padding-top:60px;
  max-width: 460px;
  position: absolute;
  top: 10%;
}
</style>