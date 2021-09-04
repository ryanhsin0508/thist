<template>
  <div class="custom-button">
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ComponentTemplate",
  props: {},
  components: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"])
  },
  methods: {
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
