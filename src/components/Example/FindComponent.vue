<template>
  <div class="find find-component">
    <CodeIntroComponent
      :codeName="'find'"
      :title="title"
      :desc="desc"
      :argumentList="argumentList"
      :usageList="usageList"
    >
      
    </CodeIntroComponent>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FindComponent",
  props: {},
  components: {},
  data() {
    return {
      title: "find",
      desc: "Get first finded item in nested list",
      argumentList: [
        {
          label: "list",
          type: "Array",
        },
        {
          label: "function",
          type: "Function",
        },
        {
          label: "childrenKeyName",
          type: "String",
        },
      ],
      usageList: [
        {
          desc: "Get Great Granddaughter’s data",
          result: `{
  role: "Great granddaughter",
  name: "Lisa",
  age: 4,
},`,
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
