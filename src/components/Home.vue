<template>
  <div class='home'>
      <Group>
        <Cell title='title'  ></Cell>
       <Cell title='title'></Cell>
    </Group>
  </div>
</template>
<script>
import {Cell, Group} from 'vux'

export default {
  name: 'Home',
  // sockets: {
  //   connect: function () {
  //     console.log('1111111')
  //   }
  // },
  components: {
    Cell,
    Group
  },
  methods: {
    test: function () {
      console.log(this, this.$socket)
      this.$socket.emit('exchange', '1111dff')
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  // background-color:red;
}
</style>
