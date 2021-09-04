<template>
  <div
    :class="[
      'custom-select custom-select-component',
      { required, disabled: disabled || !list.length },
    ]"
    ref="custom-select"
    :style="{ width }"
  >
    <div
      :class="['title', { active: showOptions }]"
      @click="showOptionsHandler()"
      :style="{
        color: title === placeholder ? '#a5a7aa' : optionColor,
        fontSize,
        border,
        height: titleHeight + 'px',
      }"
      ref="title"
    >
      <div class="title-text">
        <span
          class="color-block"
          v-if="
            list.find(option => option.value === selected)
              ? list.find(option => option.value === selected).color
              : false
          "
          :style="{
            backgroundColor: list.find(option => option.value === selected)
              .color,
          }"
        ></span>
        {{
          disabled ? "Not Available" : !list.length ? "No Option Data" : title
        }}
      </div>
      <i class="fal fa-chevron-down"></i>
    </div>
    <transition name="fade" @after-enter="getOptionMaxWidth">
      <div
        class="options"
        :style="{
          top: optionsY + 'px',
          left: optionsX + 'px',
          width: renderedOptionsWidth,
          border,
        }"
        v-show="showOptions && list.length"
      >
        
        <div class="options-wrapper">
          <ul
            ref="options"
            tabindex="1"
            @keydown.stop="keydown"
            @keyup="keyup"
            :style="{
              minWidth: optionMaxWidth + 'px',
              maxHeight: `${visibleListCount * 30}px`,
            }"
          >
            <li
              v-for="(option, index) in filteredOptions"
              :key="`option${index}`"
            >
              <div
                :class="[
                  'option-content',
                  {
                    hover: option.id === hoverId,
                    active: option.label == title,
                  },
                ]"
                @mouseover="hoverId = option.id"
                @click="clickOnOptionHandler(option)"
                :style="{
                  color:
                    option.group && !option.value ? '#797C80' : optionColor,
                  fontSize: option.group && !option.value ? '13px' : fontSize,
                  height: '30px',
                }"
              >
                <span
                  class="color-block"
                  v-if="option.color"
                  :style="{ backgroundColor: option.color }"
                ></span>
                <span class="label">{{ option.label || option.group }}</span>
              </div>
              <ul
                class="grouped-options"
                v-if="option.list"
                :style="{ width: '100%' }"
              >
                <li
                  v-for="(option, index) in option.list"
                  :key="'option-sub' + index"
                  :style="{ pointerEvents: 'all' }"
                >
                  <div
                    :class="[
                      'option-content',
                      {
                        hover: option.id === hoverId,
                        active: option.label == title,
                      },
                    ]"
                    :style="{ fontSize, height: '30px' }"
                    @mouseover="hoverId = option.id"
                    @click="clickOnOptionHandler(option)"
                  >
                    <span class="label">{{
                      option.label || option.group
                    }}</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomSelectComponent",
  props: {
    disabled: { default: false },
    value: {},
    target: { type: String },
    list: {
      type: Array,
      default() {
        return [
          { label: "label1", value: "value1" },
          { label: "label2", value: "value2" },
        ];
      },
    },
    selected: { default: "" },
    fontSize: { type: String, default: "14px" },
    visibleListCount: { type: Number, default: 10 },
    border: { default: "" },
    width: { type: String, default: "auto" },
    allowEmpty: { type: Boolean, default: false },
    defaultLabel: { type: String, default: "All" },
    optionColor: { type: String, default: "" },
    optionsWidth: { type: String, default: "100%" },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: "Please Select..." },
    titleHeight: { type: Number, default: 32 },
    showBorder: { type: Boolean, default: true },
    // showOptions: { type: Boolean, default: false }
  },
  components: {},
  data() {
    let that = this;
    return {
      optionsPosition: 0,
      selectedIndex: null,
      selectedId: null,
      hoverId: 0,
      optionMaxWidth: 0,
      showOptions: false,
      get showFilter() {
        return that.list.length > 8;
      },
      renderedOptionsWidth: 0,
      optionsX: 0,
      optionsY: 0,
      filterData: {},
      filterValue: "",
    };
  },
  computed: {
    ...mapState(["windowInfo"]),
    title() {
      if (this.selected || this.selected === 0) {
        let label = "";
        this.list.forEach(option => {
          if (option.group) {
            option.list.forEach(option => {
              if (option.value === this.selected) {
                label = option.label;
              }
            });
          }
          if (option.value === this.selected) {
            label = option.label;
          }
        });
        return label;
      } else {
        return this.placeholder;
      }
    },
    renderedOptions() {
      let renderedOptions = [...this.list];
      let id = 0;
      renderedOptions.forEach(option => {
        if (option.group) {
          id++;
          option.id = id;
          option.list.forEach(option => {
            id++;
            option.id = id;
          });
        } else {
          option.id = id;
          id++;
        }
      });
      return renderedOptions;
    },
    filteredOptions() {
      let filterValue = this.filterValue.toLowerCase();
      return this.renderedOptions.filter(option => {
        return option.label
          ? option.label.toLowerCase().includes(filterValue)
          : true;
      });
    },
  },
  methods: {
    getOptionMaxWidth() {
      this.optionMaxWidth = this.$refs.options.scrollWidth;
    },
    clickOnOptionHandler(option) {
      this.showOptionsHandler();
      this.$emit("update:selected", option.value);
      this.$emit("change", option.value);
      // this.$emit("update-custom-form-item", this.target, option.label);
      //   this.$emit("input", option.value);
    },
    focusInput() {
      if (this.$refs.filter) {
        let $input = this.$refs.filter.$el.querySelector("input");
        setTimeout(() => {
          $input.focus();
        }, 0);
      } else {
        setTimeout(() => {
          this.$refs.options.focus();
        }, 0);
      }
    },
    async showOptionsHandler(value) {
      // this.$emit("toggle-show-options", this.target);
      await this.calcOptionsPosition();
      await this.calcOptionsWidth();
      this.hoverId = this.showOptions ? this.hoverId : this.selectedIndex;
      this.showOptions = value !== undefined ? value : !this.showOptions;
      // let optionHeight = this.$refs.option[0].getBoundingClientRect().height
    },
    keydown(e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    },
    async keyup(e) {
      if (e.key === "Escape") {
        this.showOptionsHandler(false);
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          this.hoverId = this.hoverId > 0 ? this.hoverId - 1 : this.hoverId;
        }
        if (e.key === "ArrowDown") {
          if (this.hoverId !== null) {
            this.hoverId =
              this.hoverId < this.filteredOptions.length - 1
                ? this.hoverId + 1
                : this.filteredOptions.length - 1;
          } else {
            this.hoverId = 0;
          }

          // this.$refs.options.scrollTop += 40;
        }
        let $options = this.$refs.options;
        let optionsHeight = $options.getBoundingClientRect().height;
        let optionsScrollTop = $options.scrollTop;
        let optionHeight = this.$refs.option[0].getBoundingClientRect().height;
        let selectedTopPosition = optionHeight * this.hoverId;
        let selectedBottomPosition = optionHeight * (this.hoverId + 1);
        let reachedTop = selectedTopPosition < optionsScrollTop;
        let reachedBottom =
          selectedTopPosition + optionHeight > //selected option bottom
          optionsScrollTop + optionsHeight; //scroll bottom
        // $options.scrollTop = 0;
        // let
        if (reachedTop) {
          $options.scrollTop = selectedTopPosition;
        }
        if (reachedBottom) {
          $options.scrollTop = selectedBottomPosition - optionsHeight;
        } else if (selectedTopPosition < optionsScrollTop) {
          return;
        }
      }
      if (e.keyCode === 13) {
        this.selectedIndex = this.hoverId;
        this.showOptionsHandler();
        this.$emit("update:selected", this.filteredOptions[this.hoverId].value);
        this.$emit("change", this.filteredOptions[this.hoverId].value);
        // this.$emit("toggle-show-options", this.target);
      }
    },
    calcOptionsPosition() {
      let translatedParent = this.$refs.title.closest("[style*=translate]");
      let translateX = 0;
      let translateY = 0;
      if (translatedParent) {
        let translate = translatedParent.style.transform;
        translateX = parseInt(translate.split(",")[0].replace(/\D/g, ""));
        translateY = parseInt(translate.split(",")[1].replace(/\D/g, ""));
      }
      let offsetLeft =
        this.$refs.title.getBoundingClientRect().left - translateX;
      let offsetTopInWindow = this.$refs.title.getBoundingClientRect().top;
      let offsetTop = this.$refs.title.getBoundingClientRect().top - translateY;
      this.optionsX = offsetLeft;
      let optionHeight = 30;
      let optionsHeight =
        this.list.length > this.visibleListCount
          ? optionHeight * this.visibleListCount
          : optionHeight * this.list.length;
      this.optionsPosition =
        window.innerHeight - offsetTopInWindow < optionsHeight + 100
          ? "above"
          : "under";
      this.optionsY =
        this.optionsPosition === "under"
          ? offsetTop + this.titleHeight
          : offsetTop - (optionsHeight + (this.showFilter ? 44 : 0));
    },
    calcOptionsWidth() {
      let componentWidth =
        this.$refs["custom-select"].getBoundingClientRect().width;
      if (this.optionsWidth.includes("%")) {
        this.renderedOptionsWidth =
          (componentWidth / 100) * parseFloat(this.optionsWidth) + "px";
      } else {
        this.renderedOptionsWidth = this.optionsWidth;
      }
    },
    onScroll() {
      this.calcOptionsPosition();
    },
    onResize() {
      this.calcOptionsWidth();
    },
    onBlur(e) {
      if (!e.path.includes(this.$refs["custom-select"])) {
        this.showOptions = false;
      }
    },
  },
  created() {
    if (this.selected) {
      this.selectedIndex = this.list.findIndex(el => el.label == this.selected);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    document.addEventListener("click", this.onBlur);
    window.addEventListener("resize", this.onResize);
    this.$nextTick(() => {
      this.onScroll();
      this.onResize();
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    document.removeEventListener("click", this.onBlur);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.custom-select {
  margin-bottom: 12px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
  }
  .title,
  .options {
    background-color: #fff;
    color: #333;
    border: 1px solid gray;
    border-radius: 5px;
  }
  .options {
    position: fixed;
  }
  .option-content {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    & {
    }
    &:hover{
      background-color: #afd9ff;
    }
    &.active {
      background-color: #4caafd;
      color: #fff;
    }
  }
}
</style>
