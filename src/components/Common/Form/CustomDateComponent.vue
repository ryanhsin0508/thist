<template>
  <div
    :class="['custom-date custom-date-component', { required }]"
    ref="custom-select"
  >
    <h4
      :class="['title', { active: showOptions }]"
      @click="[showOptionsHandler(), focusInput()]"
      :style="{ color: optionColor, fontSize, border }"
      ref="title"
    >
      <i class="fal fa-calendar-alt" />
      <template v-if="singleDate">
        {{
          selected
            ? convertDateFormat(new Date(selected), "YYYY-MM-DD hh-mm-ss")
            : ""
        }}
      </template>
      <template v-else>
        {{ convertDateFormat(startDate, "YYYY-MM-DD hh-mm-ss") }}
        <!-- <template v-if="toISOString(startDate) === toISOString(endDate)">OKOJIOJOJO</template> -->
        <template v-if="startDate && endDate && endDate != 'Invalid Date'">
          <span>to</span>
          {{ convertDateFormat(endDate, "YYYY-MM-DD hh-mm-ss") }}
        </template>
      </template>
    </h4>

    <transition name="fade" @after-enter="calcOptionsPosition()"
      ><div
        :style="{
          position: 'fixed',
          left: optionsX + 'px',
          top: optionsY + 'px',
          zIndex: 9,
        }"
        @keyup="keyup"
        ref="options"
        v-show="showOptions"
      >
        <DateTimePickerModal
          :startDate="startDate"
          :endDate="singleDate ? undefined : endDate"
          :singleDate="singleDate"
          @submitHandler="onSubmit"
          @cancelHandler="onCancel"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FilterComponent from "@/components/FilterComponent.vue";
export default {
  name: "CustomDateComponent",
  props: {
    singleDate: { default: false },
    value: {},
    target: { type: String },
    options: {
      type: Array,
      default() {
        return [{ label: "label", value: "value" }];
      },
    },
    selected: {},
    fontSize: {
      type: String,
      default: "14px",
    },
    visibleListCount: {
      type: Number,
      default: 10,
    },
    _startDate: { default: "" },
    _endDate: { default: "" },
    border: { default: "" },
    allowEmpty: { type: Boolean, default: false },
    defaultLabel: { type: String, default: "All" },
    optionColor: { type: String, default: "" },
    optionsWidth: {
      type: String,
      default: "100%",
    },
    defaultOption: {
      type: [String, Number],
      default: "",
    },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: "Please Select..." },
    // showOptions: { type: Boolean, default: false }
  },
  components: { FilterComponent },
  data() {
    return {
      date: new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/"),
      startDate: undefined,
      endDate: undefined,
      optionsPosition: 0,
      hoverIndex: 0,
      selectedIndex: null,
      showOptions: false,
      renderedOptionsWidth: 0,
      optionsX: 0,
      optionsY: 0,
      filterData: {},
    };
  },
  computed: {
    ...mapState(["windowInfo"]),
    title() {
      return !this.value
        ? this.placeholder
        : this.options.find(option => option.value === this.value).label;
    },
    renderedOptions() {
      return this.required || !this.allowEmpty
        ? this.options
        : [{ label: this.defaultLabel, value: "" }, ...this.options];
    },
    filteredOptions() {
      let that = this;
      let filteredOptions = [];
      return this.renderedOptions.filter(option =>
        option.label.toLowerCase().includes(that.filterValue)
      );
    },
  },
  watch: {
    date(v) {
      this.showOptions = false;
    },
  },
  methods: {
    onSubmit(dateData) {
      this.startDate = dateData.startDate;
      if (!this.singleDate) {
        this.endDate = dateData.endDate;
      } else {
        this.endDate = undefined;
      }
      this.showOptions = false;

      let selectedData = this.singleDate
        ? this.startDate.toISOString()
        : [
            this.startDate.toISOString(),
            this.endDate ? this.endDate.toISOString() : "",
          ];
      this.$emit("update:selected", selectedData);
    },
    onCancel(data) {
      this.showOptions = false;
    },
    toISOString(date) {
      return date.toISOString();
    },
    clickOptionHandler(option) {
      this.showOptionsHandler();
      // this.$emit("update-custom-form-item", this.target, option.label);
      this.$emit("input", option.value);
    },
    focusInput() {},
    async showOptionsHandler(value) {
      // this.$emit("toggle-show-options", this.target);
      await this.calcOptionsPosition();
      await this.calcOptionsWidth();
      this.hoverIndex = this.showOptions ? this.hoverIndex : this.selectedIndex;
      this.showOptions = value !== undefined ? value : !this.showOptions;
      // let optionHeight = this.$refs.option[0].getBoundingClientRect().height
    },
    async keyup(e) {},
    calcOptionsPosition() {
      let $options = this.$refs.options;
      let translatedParent = this.$refs.title.closest("[style*=translate]");
      let translateX = 0;
      let translateY = 0;
      if (translatedParent) {
        let translate = translatedParent.style.transform;
        translateX = translate.split(",")[0].replace(/\D/g, "");
        translateY = translate.split(",")[1].replace(/\D/g, "");
      }
      let offsetLeft =
        this.$refs.title.getBoundingClientRect().left - translateX;
      let offsetTop = this.$refs.title.getBoundingClientRect().top - translateY;

      let windowWidth = this.windowInfo.windowWidth;
      console.log(
        "offestLeft:" + offsetLeft,
        "titleLeft:" + this.$refs.title.getBoundingClientRect().left,
        "translateX:" + translateX,
        "windowWidth:" + windowWidth
      );
      this.optionsX =
        this.$refs.title.getBoundingClientRect().left + 670 > windowWidth - 10
          ? windowWidth - translateX - 700
          : offsetLeft;
      let optionHeight = parseInt(this.fontSize) * 2;
      let optionsHeight = 290; //$options.getBoundingClientRect().height;
      optionsHeight += 100;
      this.optionsPosition =
        window.innerHeight - offsetTop < optionsHeight ? "above" : "under";
      this.optionsY =
        this.optionsPosition === "under" ? offsetTop + 32 : offsetTop - 290;
    },
    calcOptionsWidth() {
      let componentWidth = this.$refs["custom-select"].getBoundingClientRect()
        .width;
      if (this.optionsWidth.includes("%")) {
        this.renderedOptionsWidth =
          (componentWidth / 100) * parseFloat(this.optionsWidth) + "px";
      } else {
        this.renderedOptionsWidth = this.optionsWidth;
      }
    },
    onScroll() {
      let offsetTop = this.$refs.title.getBoundingClientRect().top;
      let optionHeight = parseInt(this.fontSize) * 2;
      let optionsHeight =
        this.options.length > this.visibleListCount
          ? optionHeight * this.visibleListCount
          : optionHeight * this.options.length;
      optionsHeight += 100;
      this.optionsPosition =
        window.innerHeight - offsetTop < optionsHeight ? "above" : "under";
    },
  },
  created() {
    if (this.defaultOption) {
      this.selectedIndex = this.options.findIndex(
        el => el.label == this.defaultOption
      );
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("keyup", this.keyup);
    this.$nextTick(() => {
      this.onScroll();
    });
    if (!_.isEmpty(this.selected)) {
      this.startDate = new Date(this.selected[0]);
      this.endDate = new Date(this.selected[1]);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
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
.custom-date .title {
  justify-content: flex-start;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  span {
    margin-left: 6px;
    margin-right: 6px;
  }
  i {
    font-size: 20px;
    color: #0092b0;
    margin-left: 0;
    margin-right: 10px;
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
