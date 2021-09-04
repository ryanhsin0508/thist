<template>
  <div class="tabbed-custom-form tabbed-custom-form-component">
    <TabsComponent
      :bordered="true"
      :tabList="tabList"
      :selectedIndex.sync="selectedIndex"
      :style="{ marginBottom: '16px' }"
    />
    <CustomFormItemsComponent
      :formData="formDataList[index]"
      :formItemList="formItemList[index]"
      v-show="index === selectedIndex"
      v-for="(tab, index) in tabList"
      :key="'formItem' + index"
    />
    <!-- <div v-for="(item, index) in formDataList" :key="'item'+index">{{item}}</div> -->
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
  name: "TabbedCustomFormComponent",
  props: {
    formData: { default: () => ({}) },
    formDataList: { default: () => [] },
    formItemList: { default: () => [] },
    showSubmitActions: { default: true },
    groupData: { default: () => ({}) },
    tabDisabledHandler: { type: Function, default: () => false },
  },
  components: {},
  data() {
    return {
      selectedIndex: 0,
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
    tabList() {
      let that = this;
      let list = [];
      for (let key in this.groupData) {
        let count = this.groupData[key].length;
        list.push({
          name: key,
          keyName: key,
          get disabled() {
            return that.tabDisabledHandler(that.groupData[key]);
          },
        });
      }
      return list;
    },
    submitButtonDisabled() {
      return !this.checkRequired();
    },
  },
  methods: {
    checkRequired() {
      let ok = true;
      let requiredList = [];
      this.formItemList.forEach((list, index) => {
        list.forEach(item => {
          let _requiredList = item.sectionContent.filter(
            _item => _item.required && !_item.disabled
          );
          _requiredList.forEach(_item => {
            requiredList.push(_item.target);
          });
          requiredList.forEach(key => {
            if (!this.formDataList[index][key] && this.formDataList[index].selectedList.length > 0) {
              ok = false;
            }
          });
        });
      });
      return ok;
    },
    onSubmit() {},
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
