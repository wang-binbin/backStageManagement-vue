<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    	
    <home/>
    <tab/>
    <tabOptionOne/>
    <tabOptionTwo/>
  </div>
</template>

<script>
import home from './components/home'
import tab from './components/tab'
import tabOptionOne from './components/tabOptionOne'
import tabOptionTwo from './components/tabOptionTwo'
export default {
name: 'App',
  components: {
    home,
    tab,
    tabOptionOne,
    tabOptionTwo
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
