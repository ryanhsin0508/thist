<template>
  <div class="ranged-input ranged-input-component">
    <CustomInputComponent
      :border="'1px solid #BBBCBF'"
      :placeholder="startPlaceholder"
      v-model="rangeList[0]"
      :disabled="disabled"
    />
    <span class="to">to</span>
    <CustomInputComponent
      :border="'1px solid #BBBCBF'"
      :placeholder="endPlaceholder"
      v-model="rangeList[1]"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RangedInputComponent",
  props: {
    disabled: {},
    rangeList: { default: () => [0, 1] },
    startPlaceholder: { default: "Start value of " },
    endPlaceholder: { default: "End value of " },
  },
  components: {},
  data() {
    return {
      startValue: "",
      endValue: "",
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {},
  mounted() {
    this.startValue = this.rangeList[0];
    this.endValue = this.rangeList[1];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ranged-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .custom-input {
    flex-grow: 1;
  }
  .to {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
