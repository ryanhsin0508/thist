<template>
  <CustomFormComponent
    :formData="formData"
    :formItemList="formItemList"
    :showSubmitActions="false"
  />
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GroupFilterComponent",
  props: { business: {}, selected: {} },
  components: {},
  data() {
    let that = this;
    return {
      parentDeviceGroupList: [],
      childSiteList: [],
      formData: {
        regionId: "",
        parentId: "",
        groupList: [],
      },
      get regionOptionList() {
        let list = that.createOptionsBy(
          that.parentDeviceGroupList,
          "name",
          "id"
        );
        let optionList = [{ label: "All", value: "" }, ...list];
        return optionList;
      },
      get siteOptionList() {
        let list = that.createOptionsBy(that.childSiteList, "name", "id");
        let optionList = [{ label: "All", value: "" }, ...list];

        return optionList;
      },
      get regionName() {
        return that.regionOptionList.find(
          option => option.value === that.formData.regionId
        ).label;
      },
      get regionType() {
        return that.regionOptionList.find(
          option => option.value === that.formData.regionId
        ).groupType;
      },
      get siteName() {
        return that.siteOptionList.find(
          option => option.value === that.formData.parentId
        )
          ? that.siteOptionList.find(
              option => option.value === that.formData.parentId
            ).label
          : "";
      },
      get filteredGroupList() {
        let groupList = that.organizationX.details.group.groupList;
        groupList = groupList.filter(item => item.groupType !== "business");
        tt.renderListItem(groupList, item => {
          console.log("Pqweui")
          let regionText = "";
          if (that.isRealTrue(item.regionList)) {
            item.regionList.forEach((region, index) => {
              regionText += region;
              if (index + 1 < item.regionList.length) {
                regionText += " > ";
              }
            });
            item.regionText = regionText;
          }
          if (that.isRealTrue(item.site)) {
            item.siteText = item.site.name;
          }
          return item;
        });
        let filteredGroupList = groupList.filter(group => {
          let isBusiness = that.regionType === "business";
          let regionMatch = isBusiness
            ? !group.regionText
            : !that.formData.regionId
            ? true
            : group.regionText && group.regionText.includes(that.regionName);
          let siteMatch = !that.formData.parentId
            ? true
            : group.siteText && group.siteText.includes(that.siteName);
          return regionMatch && siteMatch;
        });
        return filteredGroupList;
      },
      formItemList: [
        {
          sectionContent: [
            {
              title: "Region",
              type: "select",
              width: "50%",
              target: "regionId",
              get optionList() {
                return that.regionOptionList;
              },
            },
            {
              title: "Site",
              type: "select",
              width: "50%",
              target: "parentId",
              get disabled() {
                return that.formData.regionId === "";
              },
              get optionList() {
                return that.siteOptionList;
              },
            },
            {
              title: "Group",
              type: "table-checkbox",
              width: "100%",
              required: true,
              target: "groupList",
              get tableData() {
                let data = {
                  heading: [
                    {
                      label: "Group",
                      field: "name",
                      singleRow: true,
                    },
                    {
                      label: "Site",
                      field: "siteText",
                      singleRow: true,
                    },
                    {
                      label: "Region",
                      field: "regionText",
                      singleRow: true,
                    },
                  ],
                  content: that.filteredGroupList,
                };
                return data;
              },
            },
          ],
        },
      ],
    };
  },
  watch: {
    "formData.groupList"(data) {
      console.log(data)
      let groupIdList = [];
      if (this.checkType(data) === "array") {
        groupIdList = tt.getValueListByKey(data, "id");
        console.log(groupIdList);
      } else {
        groupIdList = [data.id];
      }
      this.$emit("update:selected", groupIdList);
    },
    "formData.regionId"(id) {
      this.formData.parentId = "";
      if (id) {
        this.getChildSiteList();
        /* if (!this.checkGroupIdExistence()) {
          this.formData.groupData = {};
        } */
      }
    },
    "formData.parentId"(id) {
      if (id && !this.checkGroupIdExistence()) {
        // this.formData.groupData = {};
      }
    },
  },
  computed: {
    ...mapState(["windowInfo", "organizationX"]),
  },
  methods: {
    checkGroupIdExistence() {
      return true;
    },
    async getOrganizationGroupList() {
      return;
      console.log(this.moduleX);
      let res = await this.$store.dispatch("organizationX/getOrganizationGroupList", {
        businessId: this.moduleX.selectedBusiness.businessId,
        obuCode: this.moduleX.selectedBusiness.region,
      });
    },
    async getParentDeviceGroupList() {
      let params = {
        businessId: this.business.businessId,
        groupType: "region",
        isFilterRegionHasSite: true,
        obuCode: this.userX.user.region,
      };
      let res = await this.$store.dispatch(
        "organizationX/getParentDeviceGroupList",
        params
      );
      console.log(this.parentDeviceGroupList);
      this.parentDeviceGroupList = res.data.parentDeviceGroupList;
    },
    async getChildSiteList() {
      this.childSiteList = [];
      let params = {
        regionId: this.formData.regionId,
      };
      let res = await this.$store.dispatch("organizationX/getChildSiteList", params);
      this.childSiteList = res.childSiteList;
    },
  },
  async mounted() {
    // this.formData.groupList = this.selected;
    console.log(this.selected)
    if (!this.organizationX.groupData.groupInfo.groupList.length) {
      this.getOrganizationGroupList();
    }
    await this.getParentDeviceGroupList();
    let groupList = []
    this.selected.forEach(id =>{
      let item = this.filteredGroupList.find(group => group.id === id);
      if(item){
        groupList.push(item)
      }
    })
      console.log(groupList)
      this.formData.groupList = groupList
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
