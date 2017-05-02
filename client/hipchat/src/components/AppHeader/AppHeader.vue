<template>
  <div class="App-Header">
    <span class="App-Header-Logo"><span></span></span>
    <div class="App-Header-User">
      <Icon label="bell"></Icon>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon';

  export default {
    components: {
      Icon,
    },
    name: 'App-Header',
  };
</script>

<style scoped>
  .App-Header {
    position: relative;
    top: 0;
    width: 100%;
    height: 41px;
    background-color: #205081;
    display: flex;
    padding: 0 10px;
    flex-direction: row;
    justify-content: space-between;
  }

  .App-Header-Logo {
    padding: 0 10px;
  }

  .App-Header-Logo:hover {
    cursor: pointer;
    background-color: #3572B0;
  }

  .App-Header-Logo span {
    height: 24px;
    width: 97px;
    margin: 8px 0;
    display: block;
    padding: 0;
    text-align: left;
    background-image: url(../../assets/login_logo@2x.png);
    background-position: 0 50%;
    background-size: 100%;
  }
</style>
