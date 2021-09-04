<template>
  <section
    :class="[
      'custom-form-items-section custom-form-items-section-component',
      content.width === 'full' || content.width === 'half' ? content.width : '',
      { review: content.type === 'review' },
    ]"
    :style="{
      width: `calc(${content.width} - ${
        parseInt(content.width) > 50 ? '0' : '8'
      }px)`,
    }"
  >
    <div class="form-item-title" v-if="content.title && content.type !=='switcher'">
      {{ content.title }} {{ content.required ? "*" : " " }}
    </div>
    <div class="note-block" v-if="content.noteBlock">
      <template v-if="checkType(content.noteBlock) === 'string'">
        {{ content.noteBlock }}
      </template>
      <template v-else-if="checkType(content.noteBlock) === 'array'">
        <p
          v-for="(value, index) in content.noteBlock"
          :key="'paragraph' + index"
        >
          {{ value }}
        </p>
      </template>
    </div>

    <CustomCheckboxComponent
      :selected.sync="content.enabler"
      v-if="content.enabler !== undefined"
      @click="clearContentValue(content)"
    />
    <CustomSwitcherComponent
      :switcherTitle="content.switcherTitle"
      :id="content.id"
      :disabled="content.disabled"
      :isEnabled.sync="formData[content.target]"
      v-if="content.type === 'switcher'"
    />
    <CustomInputComponent
      :type="content.type"
      :border="'1px solid #d1d2d4'"
      :placeholder="content.placeholder"
      v-model="formData[content.target]"
      :min="content.min"
      :max="content.max"
      :disabled="content.disabled"
      v-if="
        content.type === 'text' ||
          content.type === 'number' ||
          content.type === 'email' ||
          content.type === 'password' ||
          content.type === 'textarea'
      "
    />
    <CustomRadioComponent
      :list="content.radioList"
      :selected.sync="formData[content.target]"
      :disabled="content.disabled"
      v-if="content.type === 'radio'"
    />
    <GroupFilterComponent
      :business="content.business"
      :selected.sync="formData[content.target]"
      v-if="content.type === 'group'"
    />
    <CustomCheckboxComponent
      :id="content.id"
      :selected.sync="formData[content.target]"
      :value="content.value"
      v-if="content.type === 'checkbox'"
    >
      {{ content.label }}
    </CustomCheckboxComponent>
    <TableComponent
      :selection="content.type === 'table-radio' ? 'single' : 'multiple'"
      :selected.sync="formData[content.target]"
      :selectArea="'all'"
      :maxHeight="'188px'"
      :tableData="content.tableData"
      v-if="content.type === 'table-radio' || content.type === 'table-checkbox'"
    />
    <NestedSelectComponent
      :border="'1px solid #d1d2d4'"
      :list="content.optionList"
      :isMultipleSelect="content.type === 'multi-select'"
      :showContent="
        content.tagName === 'TagComponent' ? taggedShowContent : showContent
      "
      :placeholder="content.placeholder"
      :disabled="content.disabled"
      :selected.sync="formData[content.target]"
      v-if="content.type === 'select' || content.type === 'multi-select'"
    />
    <CustomDateComponent
      :style="{ width: '100%' }"
      :border="'1px solid #d1d2d4'"
      :optionColor="'#63666b'"
      :singleDate="content.type !== 'ranged-date'"
      :selected.sync="formData[content.target]"
      v-if="content.type === 'date' || content.type === 'ranged-date'"
    />
    <CustomTimeComponent
      :border="'1px solid #d1d2d4'"
      :optionColor="'#63666b'"
      :singleTime="content.type !== 'ranged-time'"
      :selected.sync="formData[content.target]"
      :disabled="content.disabled"
      v-if="content.type === 'time' || content.type === 'ranged-time'"
    />
    <CustomUploaderComponent
      :id="content.id"
      :file.sync="formData[content.target]"
      v-if="content.type === 'file'"
    />
    <RangedInputComponent
      :startPlaceholder="content.startPlaceholder"
      :endPlaceholder="content.endPlaceholder"
      :rangeList.sync="formData[content.target]"
      :disabled="content.disabled"
      v-if="content.type === 'range'"
    />
    <TableComponent
      :selected.sync="formData[content.target]"
      :tableData="content.tableData"
      v-if="content.type === 'preview-table'"
    />

    <div class="preview" v-if="content.type === 'preview-basic'">
      <div class="preview-content">
        <CustomInputComponent :readonly="true" v-model="content.previewText" />
        <button class="no-border icon" @click.stop="showPreviewList(content)">
          <i class="fal fa-list-ul" />
        </button>
      </div>
    </div>
    <div
      class="review"
      v-if="content.type === 'review'"
      v-html="content.data"
    ></div>
    <p class="note" v-if="content.note">{{ content.note }}</p>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomFormItemsSectionComponent",
  props: {
    content: {},
    formData: {},
  },
  components: {},
  data() {
    return {
      showContent: [{ heading: "", keyName: "label" }],
      taggedShowContent: [
        { heading: "", keyName: "label", tagName: "TagComponent" },
      ],
      mappingList: [
        {
          component: "CustomInputComponent",
        },
      ],
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {
    clearContentValue(content) {
      this.formData[content.target] = [];
    },
    showPreviewList(content) {
      let that = this;
      let popupOptions = {
        title: "Device List",
        isGlobal: false,
        width: "800px",
        resizable: true,
      };
      let popupData = {
        list: content.list,
        columns: content.columns,
        selectable: content.selectable,
        selectedList: content.selectedList,
        rowKey: content.rowKey,
        updateSelected(selected) {
          that.formData.selectedList = selected;
        },
      };
      this.addPopup("PreviewTableComponent", popupOptions, popupData);
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.note-block {
  width: 100%;
  margin: 0 0 16px 0;
}
.preview {
  flex-grow: 1;
  .preview-content {
    display: flex;
    .custom-input {
      flex-grow: 1;
    }
    button {
      margin-left: 6px;
    }
  }
}
</style>
