<template>
  <ul class="custom-radio">
    <li
      :class="{
        active:
          _.findIndex(list, _item => _item.value === innerSelected) === index,
        disabled: item.disabled,
      }"
      v-for="(item, index) in list"
      :key="'radio' + index"
      @click="clickHandler(item)"
    >
      <CustomRadioItemComponent
        :style="{ marginRight: '10px' }"
        :selected.sync="innerSelected"
        :value="item.value"
      />
      <span class="label" v-if="item.label">{{ item.label }}</span>
      <span :class="['info', { active: item.info.value > 0 && !item.disabled }]" v-if="item.info"
        >{{ item.info.name }} {{ item.info.value }}</span
      >
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomRadioComponent",
  props: {
    list: {
      type: Array,
      default: _ => [
        {
          label: "",
          value: "value",
          info: "",
        },
      ],
    },
    disabled: { default: false },
    selected: {},
    selectedData: { type: Object },
  },
  components: {},
  data() {
    return {
      checked: false,
      selectedIndex: -1,
      innerSelected: "",
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {
    clickHandler(item) {
      this.innerSelected = item.value;
      this.$emit("update:selected", item.value);
      this.$emit("update:selectedData", item);
    },
  },
  mounted() {
    this.list.forEach((item, index) => {
      if (_.isEqual(this.selectedData, item) || this.selected === item.value) {
        this.selectedIndex = index;
      }
    });
    if (this.isRealTrue(this.selected)) {
      this.innerSelected = this.selected;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-radio {
  li {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 10px 0;
    cursor: pointer;
    // text-transform: capitalize;
    &.disabled {
      pointer-events: none;
      color: #a5a7aa;
    }
    span {
      margin-right: 10px;
    }
    .radio-circle {
      position: relative;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      border: 1px solid $gray4;
      margin-right: 10px;
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
      }
    }
    &.active .radio-circle {
      border-color: $main300;
      &::after {
        opacity: 1;
      }
    }
    .info {
      padding: 3px 8px;
      background-color: #f1f2f3;
      font-size: 12px;
      color: $gray7;
      border-radius: 4px;
      &.active {
        background-color: $main100;
        color: $main500;
      }
    }
  }
}

.active {
  color: $main500;
}
</style>
