<template>
  <div class="find-item find-item-component">
    <CodeIntroComponent
      :title="title"
      :desc="desc"
      :argumentList="argumentList"
      :usageList="usageList"
    >
      <template v-slot:code>
        tt.<span class="code-function-name">findItem</span>(familyList, "role",
        "Great granddaughter", "children")
      </template>
    </CodeIntroComponent>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FindItemComponent",
  props: {},
  components: {},
  data() {
    return {
      title: "findItem",
      desc: "Get first finded item in nested list",
      argumentList: [
        {
          label: "list",
          type: "Array",
        },
        {
          label: "keyName",
          type: "String",
        },
        {
          label: "value",
          type: "String",
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
