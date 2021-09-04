<template>
  <div class="custom-form-items custom-form-items-component">
    <section class="form-section">
      <ul>
        <li
          v-for="(section, listIndex) in filteredFormItemList"
          :key="'list' + listIndex"
        >
          <div class="form-section-title" v-if="section.sectionTitle">
            {{ section.sectionTitle }}
          </div>
          <div class="note-block" v-if="section.note">
            <template v-if="typeof section.note === 'string'">{{
              section.note
            }}</template>
            <template v-else>
              <span class="highlighted-title">{{ section.note.label }}</span>
              <span>{{ section.note.labelContent }}</span>
              <p>{{ section.note.note }}</p>
            </template>
          </div>
          <CustomFormItemsSectionComponent
            :content="content"
            :formData="formData"
            v-for="(content, contentIndex) in section.sectionContent"
            :key="'form item' + contentIndex"
            v-show="!content.hide && !content.isAdvanced"
          />
          <AccordionComponent
            :border="'none'"
            :titleHeight="'20px'"
            :titleSize="'13px'"
            :titleJustify="'center'"
            :titleColor="'#00758D'"
            v-if="tt.hasKey(section.sectionContent, 'isAdvanced')"
          >
            <template v-slot:title>
              <div class="advanced-settings">
                <div class="title-text">Advanced Settings</div>
              </div> </template
            ><CustomFormItemsSectionComponent
              :content="content"
              :formData="formData"
              v-for="(content, contentIndex) in section.sectionContent"
              :key="'form item' + contentIndex"
              v-show="!content.hide && content.isAdvanced"
            />
          </AccordionComponent>
          <div class="submit-actions" v-if="section.submit">
            <button class="colored" @click="section.submit">Apply</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomFormItemsComponent",
  props: {
    formItemList: {},
    formData: {},
  },
  components: {},
  data() {
    return {
      showContent: [{ heading: "", keyName: "label" }],
      test: "",
      taggedShowContent: [
        { heading: "", keyName: "label", tagName: "TagComponent" },
      ],
    };
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
    filteredFormItemList() {
      let filteredList = [];
      this.formItemList.forEach(item => {
        let filteredSectionList = item.sectionContent.filter(
          _item => !_item.hide
        );
        filteredList.push({ ...item, sectionContent: filteredSectionList });
      });
      return filteredList;
    },
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-section ul {
  width: 100%;
}
</style>
