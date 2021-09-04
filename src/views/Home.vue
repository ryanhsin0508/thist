<template>
  <div class="home">
    <HomeComponent />
  </div>
</template>

<script>
import HomeComponent from '../components/HomeComponent.vue';
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    HomeComponent
  },
};
</script>
