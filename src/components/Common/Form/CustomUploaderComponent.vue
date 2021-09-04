<template>
  <div class="custom-upload custom-upload-component">
    <input :id="id" type="file" :accept="accept" @change="onFileChange" />
    <div class="btns">
      <label :for="id" class="btn-upload-file colored">Choose File</label>
      {{ file ? file.name : "" }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CustomUploaderComponent",
  props: {
    id: { required: true },
    file: {},
    accept: {
      default:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv",
    },
    isMultipleUpload: { default: false },
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["windowInfo"]),
  },
  methods: {
    onFileChange(e) {
      this.$emit("update:file", e.target.files[0]);
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
