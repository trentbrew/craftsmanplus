<script setup></script>

<template>
  <div class="fill-screen flex-col center-content">
    <ul class="__nav flex">
      <router-link to="/"><li>Search</li></router-link>
      <router-link to="/saved"><li>Saved Books</li></router-link>
      <!--router-link to="/about"><li>About</li></router-link-->
    </ul>
    <Transition>
      <router-view/>
    </Transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Inter&display=swap');
body {
  background-color: #eee;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.__nav a {
  margin-right: 18px;
  margin-left: 18px;
  opacity: 0.3;
  transition: 200ms;
  font-weight: bold;
}
.__nav a:hover {
  opacity: 0.6;
}
.router-link-exact-active {
  opacity: 1 !important;
}
</style>
