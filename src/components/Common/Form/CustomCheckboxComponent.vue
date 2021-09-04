<template>
  <div class="custom-checkbox" :class="{ active: checked }" :style="{ color }">
    <input
      type="checkbox"
      :id="id"
      :checked="
        checkType(selected) === 'array' ? selected.includes(value) : selected
      "
      :value="value"
      @change="updateSelected($event)"
      @click.stop
    />
    <span class="checkbox-shape"></span>
    <label :for="id"><slot /></label>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomCheckboxComponent",
  props: {
    id: {
      default: () =>
        "checkbox-" +
        Math.random()
          .toString(16)
          .substr(2),
    },
    label: { default: "" },
    value: {},
    selected: {},
    color: {},
  },
  components: {},
  data() {
    return {
      checked: false,
    };
  },
  watch: {
    checked(v) {
      console.log("emiter");
      // this.$emit("input", v);
    },
  },
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {
    updateSelected(e) {
      console.log(this.selected);
      console.log(e.target.checked);
      this.$emit("change");
      this.$emit("click");
      let type = this.checkType(this.selected);
      if (type === "array") {
        let arr = [];
        if (e.target.checked) {
          arr = [...this.selected, this.value];
        } else {
          arr = _.without(this.selected, this.value);
        }
        this.$emit("update:selected", arr);
      } else {
        console.log(e.target.checked);
        this.$emit("update:selected", e.target.checked);
      }
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-checkbox {
  position: relative;
  display: flex;
  font-size: 14px;
  line-height: 2;
  align-items: center;
}
input {
  width: 16px !important;
  height: 16px !important;
  margin-right: 10px;
  opacity: 0;
}
.active {
  color: $main500a;
}
.checkbox-shape {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #797c80;
  border-radius: 2px;
  pointer-events: none;
}
input:checked ~ .checkbox-shape {
  border-color: $main500;
  &:after {
    content: "";
    position: absolute;
    display: block;
    bottom: 5px;
    left: 1px;
    width: 12px;
    height: 6px;
    border-left: 2px solid $main500;
    border-bottom: 2px solid $main500;
    transform: rotate(-45deg);
  }
}
</style>
