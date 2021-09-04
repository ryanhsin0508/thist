<template>
  <div :class="['custom-input custom-input-component', { required }]">
    <input
      :type="type"
      :style="{
        fontSize,
        width,
        border,
        height,
        backgroundColor: readonly ? '#F9FAFB' : '',
        pointerEvents: readonly ? 'none' : '',
        cursor: readonly ? 'default' : '',
        userSelect: readonly ? 'none' : '',
      }"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      :class="[{ fa: false }]"
      autocomplete="new-password"
      :maxlength="maxlength"
      @input="[$emit('input', $event.target.value)]"
      @keydown.enter.prevent
      @keyup.enter="$emit('on-enter')"
      @blur="type === 'email' ? $emit('on-blur', $event.target.value) : null"
      v-if="type === 'text' || type === 'password' || type === 'email'"
    />
    <textarea
      :type="type"
      :style="{
        fontSize,
        width,
        border,
        resize: 'none',
      }"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      autocomplete="new-password"
      :maxlength="maxlength"
      @input="[$emit('input', $event.target.value)]"
      @keyup.enter="$emit('on-enter')"
      @blur="type === 'email' ? $emit('on-blur', $event.target.value) : null"
      v-if="type === 'textarea'"
    />
    <p class="error-msg">{{errorMsg}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomInputComponent",
  props: {
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" },
    type: { type: String, default: "text" },
    target: { type: String },
    value: { type: [String, Number] },
    placeholder: { type: String },
    isShowPassword: { type: Boolean, default: false },
    fontSize: { type: String, default: "14px" },
    required: { type: Boolean, default: false },
    width: { type: String, default: "100%" },
    border: { type: String },
    height: { default: "32px" },
    inputStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    maxlength: { type: [String, Number], default: "none" },
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["status", "windowInfo"]),
  },
  methods: {
    blur() {
      console.log("bluer");
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input,
textarea {
  padding: 0.5em;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 5px;
  outline: none;
}
.custom-input {
  position: relative;
}
.required {
  &::before {
    content: "*";
    position: absolute;
    right: -16px;
    top: 16px;
    font-size: 12px;
    color: #f00;
  }
}
.error-msg {
  // color: #ffc800;
  line-height: 1.5;
  color: #ff0000;
  font-size: 14px;
}
</style>
