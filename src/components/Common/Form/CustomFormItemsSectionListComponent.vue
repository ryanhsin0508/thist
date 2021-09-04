<template>
  <li>
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
      v-show="!content.hide"
    />
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ComponentTemplate",
  props: {
    section: {},
    formData: {},
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
