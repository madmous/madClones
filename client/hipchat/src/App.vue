<template>
  <div class="App">
    <AppHeader />
    <main>
      <AppSidebar />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import AppSidebar from './components/AppSidebar/AppSidebar';
  import AppHeader from './components/AppHeader/AppHeader';

  export default {
    components: {
      AppSidebar,
      AppHeader,
    },
    name: 'app',
  };
</script>

<style>
  html, body, .App {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
  }

  main {
    background-color: #F5F5F5;
    display: flex;
    width: 100%;
    height: 100%;
  }

  .App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
