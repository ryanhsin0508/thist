<template>
  <div class="custom-wizard custom-wizard-component">
    <section class="popup-section">
      <StepsComponent
        :connectionLinePadding="20"
        :stepList="renderedList"
        :currentStep="currentStep"
      />
    </section>
    <ul>
      <li v-for="(step, stepIndex) in renderedList" :key="'step' + stepIndex">
        <template v-if="currentStep === stepIndex">
          <div class="step-desc">{{ step.stepDesc }}</div>
          <div class="colored-block" v-if="step.coloredBlock">
            <template v-if="typeof step.coloredBlock === 'string'">
              {{step.coloredBlock}}
            </template>
            <template v-else>
              <span class="highlighted-title">{{ step.coloredBlock.label }}</span>
              <span>{{ step.coloredBlock.labelContent }}</span>
              <p>{{ step.coloredBlock.note }}</p>
            </template>
          </div>
          <CustomFormItemsComponent
            :formItemList="step.formItemList"
            :formData="formData"
          />
        </template>
      </li>
    </ul>
    <section class="submit-actions">
      <button class="" @click="$emit('cancel')">Cancel</button>
      <button
        :class="{ disabled: currentStep < 1 }"
        @click="currentStep--"
        v-if="currentStep > 0"
      >
        Back
      </button>
      <button
        :class="['colored', { disabled: submitButtonDisabled }]"
        :disabled="submitButtonDisabled"
        @click="
          currentStep === stepDataList.length ? $emit('submit') : currentStep++
        "
      >
        {{ currentStep === stepDataList.length ? "Submit" : "Next" }}
      </button>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomWizardComponent",
  props: {
    title: { type: String, default: "Wizard Name" },
    formData: {},
    coloredBlock: {},
    stepDataList: {},
  },
  components: {},
  data() {
    return {
      currentStep: 0,
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
    stepList() {
      let list = [];
      this.stepDataList.forEach(item => {
        list.push({ stepName: item.stepName });
      });
      return list;
    },
    renderedList() {
      let that = this;
      let reviewList = [];
      let reviewData = {
        stepName: "Review",
        stepDesc: `Step ${this.stepDataList.length +
          1} - Review ${this.title.toLowerCase()} settings`,
        formItemList: [],
      };
      this.stepDataList.forEach((stepData, stepIndex) => {
        reviewData.formItemList.push({
          sectionTitle: stepData.stepName,
          sectionContent: [],
        });
        stepData.formItemList.forEach(formData => {
          formData.sectionContent.forEach(section => {
            if (!(section.hide || section.disabled)) {
              let sectionType = section.type;
              let item = {
                type: sectionType === "group" ? "preview-table" : "review",
                title: section.title || section.title,
              };
              let data = that.isRealTrue(section.previewText)
                ? section.previewText
                : that.formData[section.target];
              let dataType = this.checkType(data);
              if (sectionType === "group") {
                let content = [];
                data.forEach(groupId => {
                  let group = section.groupList.find(
                    _group => _group.id === groupId
                  );
                  content.push(group);
                });
                item.tableData = {
                  heading: [
                    { label: "Group", field: "name" },
                    { label: "Site", field: "siteText" },
                    { label: "Region", field: "regionText" },
                  ],
                  content,
                };
              } else if (dataType === "array") {
                let list = data;
                if (sectionType.includes("select")) {
                  list = [];
                  data.forEach(v => {
                    let item = tt.findListItem(
                      section.optionList,
                      "value",
                      v,
                      "list"
                    );
                    list.push(item.label);
                  });
                  data = list.join(", ");
                }
                if (sectionType.includes("date")) {
                  list = [];
                  data.forEach(v => {
                    list.push(v.replace(/[TZ]/g, " "));
                  });
                  data = list.join(" - ");
                }
                if (sectionType.includes("time")) {
                  list = [];
                  data.forEach(timeObject => {
                    list.push(
                      `${timeObject.HH}:${timeObject.mm}:${timeObject.ss}`
                    );
                  });
                  data = list.join(" - ");
                }
                if (sectionType.includes("group")) {
                  let list = [];
                  data.forEach(groupId => {
                    let item = section.groupList.find(
                      item => item.id === groupId
                    );
                    list.push(item.name);
                  });
                  item.tableData = {
                    heading: [
                      { label: "aaa", field: "name" },
                      { label: "Type", field: "type" },
                    ],
                    content: [
                      { id: 99, name: "test1", type: "typefield" },
                      { id: 1, name: "test2", type: "typefield" },
                    ],
                  };
                  // data = list.join(", ");
                }
                //array end
              }
              if (dataType === "string" && sectionType.includes("select")) {
                let item = tt.findListItem(
                  section.optionList,
                  "value",
                  data,
                  "list"
                );
                if (item) {
                  data = item.label;
                }
              }
              if (sectionType === "time") {
                data = `${data.hh}:${data.mm}`;
              }
              if (dataType === "date") {
                data = that.convertDateFormat(
                  new Date(data),
                  "YYYY-MM-DD hh-mm-ss"
                );
              }
              item.data = data;

              /* get data() { 
                  //content.data in custom-form-items-component
                  let sectionType = section.type;
                  let data = that.isRealTrue(section.previewText)
                    ? section.previewText
                    : that.formData[section.target];
                  let dataType = that.checkType(data);
                  if (dataType === "array") {
                    let list = data;
                    if (sectionType.includes("select")) {
                      list = [];
                      data.forEach(v => {
                        let item = tt.findListItem(
                          section.optionList,
                          "value",
                          v,
                          "list"
                        );
                        list.push(item.label);
                      });
                      data = list.join(", ");
                    }
                    if (sectionType.includes("date")) {
                      list = [];
                      data.forEach(v => {
                        list.push(v.replace(/[TZ]/g, " "));
                      });
                      data = list.join(" - ");
                    }
                    if (sectionType.includes("time")) {
                      list = [];
                      data.forEach(timeObject => {
                        list.push(
                          `${timeObject.HH}:${timeObject.mm}:${timeObject.ss}`
                        );
                      });
                      data = list.join(" - ");
                    }
                    if (sectionType.includes("group")) {
                      let list = [];
                      data.forEach(groupId => {
                        let item = section.groupList.find(
                          item => item.id === groupId
                        );
                        list.push(item.name);
                      });
                      item.tableData = {
                        heading: [
                          { label: "aaa", field: "name" },
                          { label: "Type", field: "type" },
                        ],
                        content: [
                          { id: 99, name: "test1", type: "typefield" },
                          { id: 1, name: "test2", type: "typefield" },
                        ],
                      };
                      // data = list.join(", ");
                    }
                    //array end
                  }
                  if (dataType === "string" && sectionType.includes("select")) {
                    let item = tt.findListItem(
                      section.optionList,
                      "value",
                      data,
                      "list"
                    );
                    if (item) {
                      data = item.label;
                    }
                  }
                  if (sectionType === "time") {
                    data = `${data.hh}:${data.mm}`;
                  }
                  if (dataType === "date") {
                    data = that.convertDateFormat(
                      new Date(data),
                      "YYYY-MM-DD hh-mm-ss"
                    );
                  }
                  return data;
                } */
              reviewData.formItemList[stepIndex].sectionContent.push(item);
              reviewList.push(section);
            }
          });
        });
      });

      let renderedList = [...this.stepDataList, reviewData];
      return renderedList;
    },
    submitButtonDisabled() {
      return (
        this.checkRequired() && this.currentStep !== this.stepDataList.length
      );
    },
  },
  methods: {
    checkRequired() {
      let requiredList = [];
      let hasEmptyInRequired = false;
      this.renderedList[this.currentStep].formItemList.forEach(item => {
        let _requiredList = item.sectionContent.filter(
          _item =>
            (_item.required || _item.enabler) && !(_item.disabled || _item.hide)
        );
        _requiredList.forEach(_item => {
          requiredList.push(_item.target);
        });
      });
      requiredList.forEach(key => {
        if (this.isRealFalse(this.formData[key])) {
          hasEmptyInRequired = true;
        }
      });
      return hasEmptyInRequired;
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.step-desc {
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
}
</style>
