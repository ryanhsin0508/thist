<template>
  <div class="custom-form custom-form-component">
    <CustomFormItemsComponent
      :formData="formData"
      :formItemList="formItemList"
    />
    <section class="submit-actions" v-if="showSubmitActions">
      <button @click="$emit('cancel')">Cancel</button>
      <button
        :class="['colored', { disabled: submitButtonDisabled }]"
        :disabled="submitButtonDisabled"
        @mouserover="showTooltip($event, 'Rename', { y: 30 })"
        @click="$emit('submit')"
      >
        Submit
      </button>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomFormComponent",
  props: {
    formData: { default: () => {} },
    formItemList: { default: () => [] },
    showSubmitActions: { default: true },

  },
  components: {},
  data() {
    return {
      errorMsgData: {},
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
    submitButtonDisabled() {
      return this.checkRequired();
    },
  },
  methods: {
    checkRequired() {
      let requiredList = [];
      let hasEmptyInRequired = false;
      this.formItemList.forEach(item => {
        let _requiredList = item.sectionContent.filter(
          _item => _item.required && !_item.disabled
        );
        _requiredList.forEach(_item => {
          requiredList.push(_item.target);
        });
      });
      requiredList.forEach(key => {
        if (!this.formData[key]) {
          hasEmptyInRequired = true;
        }
      });
      return hasEmptyInRequired;
    },
    onSubmit() {},
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
