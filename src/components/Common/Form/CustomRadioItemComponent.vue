<template>
  <div class="custom-radio-item custom-radio-item-component">
    <span
      :class="['radio-circle', { active: selected === value }]"
      @click="$emit('update:selected', value)"
    ></span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomRadioItemComponent",
  props: {
    selected: {},
    value: {},
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.radio-circle {
  display: block;
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: 1px solid #d1d2d4;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    left: 2px;
    top: 2px;
    border-radius: 6px;
    background-color: $main500;
    opacity: 0;
    transition: opacity 0.25s;
  }
  &.active {
    border-color: #58dadc;
    &::after {
      opacity: 1;
    }
  }
}
</style>
