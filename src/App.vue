<template lang="pug">
#app
  b-nav(tabs vertical )
    b-nav-item.mt-3(to='/')
      img(src="./assets/img/tomato.png" width="40px")
    b-nav-item.mt-3(to='/setting')
      img(src="./assets/img/misic.png" width="40px")
    b-nav-item.mt-3(to='/chart')
      img(src="./assets/img/chart.png" width="40px")
  keep-alive
  router-view(v-if="$route.meta.keepAlive")
  router-view(v-if="!$route.meta.keepAlive")
</template>

<style lang="scss">
  // Import custom SASS variable overrides, or alternatively
  // define your variable overrides here instead
  @import 'assets/scss/vendors/bootstrap-vue/_custom.scss';

  // Import Bootstrap and BootstrapVue source SCSS files
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';
html,body{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
}
#app{
  height: 100%;
  width: 100%;
  background: #FFE5B5;
  position: relative;
}
.nav{
  position: absolute;
  top: 20px;
  right: 0;
  border: none;
}
.nav-link{
  border-radius: 25px 0 0 25px !important;
}
.router-link-exact-active{
  background: #fff;
}
</style>
