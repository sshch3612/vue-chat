<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 v-on:click="showContent">{{message}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:['message'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showContent: function (e) {
      console.log(e, 444)
    }
  },
  beforeCreate () {
    console.log('beforecreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
