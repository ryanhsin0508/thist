<template>
  <div class="custom-swicher custom-switcher-component">
    <input
      :id="id"
      type="checkbox"
      :checked="isEnabled"
      @change="updateEnabled"
    />
    <div class="switcher">
      <span class="handle"></span>
    </div>
    <label :for="id">{{ switcherTitle }}</label>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomSwitcherComponent",
  props: {
    switcherTitle: { default: "Switcher" },
    isEnabled: { type: Boolean, default: false },
    id: { required: true },
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {
    updateEnabled(e) {
      this.$emit("update:isEnabled", e.target.checked);
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input[type="checkbox"] {
  z-index: 1;
  position: absolute;
  width: 40px;
  height: 28px;
  opacity: 0;
}
.custom-swicher {
  display: flex;
  align-items: center;
  > * {
    cursor: pointer;
  }
}
.switcher {
  position: relative;
  background-color: #d1d2d4;
  width: 34px;
  height: 14px;
  border-radius: 10px;
  margin-right: 6px;
  transition: all 0.25s;
  .handle {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    left: 0;
    top: -3px;
    opacity: 1;
    border-radius: 10px;
    background-color: #8f9195;
    border: none;
    transition: all 0.25s;
    pointer-events: none;
    z-index: 0;
  }
}
input:checked ~ .switcher {
  background-color: #ccec94;
  .handle {
    left: 14px;
    background-color: #8bc34a;
  }
}
label {
  font-size: 14px;
  line-height: 2;
}
</style>
