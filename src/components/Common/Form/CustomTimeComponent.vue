<template>
  <div
    :class="['custom-time custom-time-component', { required, disabled }]"
    ref="component"
  >
    <template v-if="singleTime">
      <div
        class="title"
        :style="{ color: optionColor, fontSize, border }"
        ref="title"
      >
        <i class="fal fa-clock" />
        {{ (startTime && startTime.HH) || "hh" }}:{{
          (startTime && startTime.mm) || "mm"
        }}:{{ (startTime && startTime.ss) || "ss" }}
      </div>
    </template>
    <template v-else>
      <div
        class="title"
        :style="{ color: optionColor, fontSize, border }"
        ref="title"
      >
        <i class="fal fa-clock" />
        {{ startTime.HH || "hh" }}:{{ startTime.mm || "mm" }}:{{
          startTime.ss || "ss"
        }}
      </div>
      <span class="to">to</span>
      <div
        class="title"
        :style="{ color: optionColor, fontSize, border }"
        ref="title"
      >
        <i class="fal fa-clock" />
        {{ endTime.HH || "hh" }}:{{ endTime.mm || "mm" }}:{{
          endTime.ss || "ss"
        }}
      </div>
    </template>
    <div
      :class="[
        'time-picker-container',
        {
          'height-exceeded': containerTop + 180 > windowInfo.windowHeight,
        },
      ]"
      :style="{
        width: singleTime ? componentWidth + 'px' : componentWidth + 'px',
        top: this.containerTop + 'px',
      }"
      ref="options"
    >
      <TimePicker
        :format="'HH:mm:ss'"
        :value="startTime"
        :style="{ width: 'calc(50% - 12px)' }"
        @change="onStartTimeChange"
        @cancelHandler="onCancel"
      />
      <TimePicker
        :format="'HH:mm:ss'"
        :value="endTime"
        :style="{ width: 'calc(50% - 12px)' }"
        @change="onEndTimeChange"
        @cancelHandler="onCancel"
        v-if="!singleTime"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FilterComponent from "@/components/FilterComponent.vue";
export default {
  name: "CustomTimeComponent",
  props: {
    disabled: { default: false },
    value: {},
    target: { type: String },
    options: {
      type: Array,
      default() {
        return [{ label: "label", value: "value" }];
      },
    },
    fontSize: {
      type: String,
      default: "14px",
    },
    visibleListCount: {
      type: Number,
      default: 10,
    },
    singleTime: { default: false },
    selected: { default: () => ({}) },
    border: { default: "" },
    allowEmpty: { type: Boolean, default: false },
    defaultLabel: { type: String, default: "All" },
    optionColor: { type: String, default: "" },
    optionsWidth: {
      type: String,
      default: "100%",
    },
    required: { type: Boolean, default: false },
  },
  components: { FilterComponent },
  data() {
    return {
      date: new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/"),
      startTime: {},
      endTime: {},
      scrollableParent: undefined,
      containerTop: 0,
      optionsPosition: 0,
    };
  },
  computed: {
    ...mapState(["windowInfo"]),
  },
  watch: {
    date(v) {
      this.showOptions = false;
    },
    selected(data) {
      if (this.isRealFalse(data)) {
        this.startTime = {};
        this.endTime = {};
      }
    },
  },
  methods: {
    getTimePickerPosition() {
      let translatedParent = this.$refs.component.closest("[style*=translate]");
      let translateX = 0;
      let translateY = 0;
      if (translatedParent) {
        let translate = translatedParent.style.transform;
        translateX = parseInt(translate.split(",")[0].replace(/\D/g, ""));
        translateY = parseInt(translate.split(",")[1].replace(/\D/g, ""));
      }
      this.containerTop =
        this.$refs.component.getBoundingClientRect().top - translateY;
    },
    onStartTimeChange(data) {
      this.startTime = data.data;
      let selected;
      if (this.singleTime) {
        selected = data.data;
      } else {
        selected = [...this.selected];
        selected[0] = data.data;
      }
      this.$emit("update:selected", selected);
    },
    onEndTimeChange(data) {
      this.endTime = data.data;
      let selected = [...this.selected];
      selected[1] = data.data;
      this.$emit("update:selected", selected);
    },
    onCancel(data) {
      this.showOptions = false;
    },
    toISOString(date) {
      return date.toISOString();
    },
    focusInput() {},
    calcOptionsWidth() {
      let componentWidth = this.$refs["component"].getBoundingClientRect()
        .width;
      if (this.optionsWidth.includes("%")) {
        this.renderedOptionsWidth =
          (componentWidth / 100) * parseFloat(this.optionsWidth) + "px";
      } else {
        this.renderedOptionsWidth = this.optionsWidth;
      }
    },
    onScroll() {
      this.getTimePickerPosition();
    },
  },
  created() {},
  mounted() {
    console.log(this.$refs.component);
    this.$nextTick(() => {
      this.scrollableParent = this.getScrollableParent(this.$refs.component);
      console.log(this.scrollableParent);
      this.getTimePickerPosition();
      if (this.scrollableParent) {
        this.scrollableParent.addEventListener("scroll", this.onScroll);
      }
    });
    if (!_.isEmpty(this.selected)) {
      this.startTime = this.selected[0];
      this.endTime = this.selected[1];
    }
    
    this.componentIntersectionObserver = new IntersectionObserver(entries => {
      console.log('a')
    })
    this.componentIntersectionObserver.observe(this.$refs.component)
  },
  beforeDestroy() {
    // this.componentResizeObserver.unobserve(this.$refs.component)
  },
  destroyed() {
    // this.scrollableParent.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("keyup", this.keyup);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-wrapper {
  display: flex;
  justify-content: flex-end;
  margin: 5px 10px;
}
.to {
  margin-left: 6px;
  margin-right: 6px;
}
.time-picker-container {
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
.height-exceeded {
  /deep/ .dropdown {
    margin-top: -212px;
  }
}
.custom-time {
  position: relative;
  display: flex;
  align-items: center;
  &.disabled {
    .title {
      opacity: 0.5;
      color: #63666b;
      background-color: #f1f2f3;
    }
  }
  .title {
    // opacity: 0;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 32px;
    border: 1px solid #d1d2d4;
    background-color: white;
    border-radius: 5px;
    pointer-events: none;
    z-index: 2;
    i {
      font-size: 20px;
      color: #0092b0;
      margin-left: 0;
      margin-right: 10px;
    }
  }
  /deep/.display-time {
    opacity: 0;
  }
  /deep/.clear-btn {
    display: none;
  }
}
.required {
  &::before {
    content: "*";
    position: absolute;
    right: -16px;
    top: 16px;
    font-size: 30px;
    color: #f00;
  }
}
</style>
