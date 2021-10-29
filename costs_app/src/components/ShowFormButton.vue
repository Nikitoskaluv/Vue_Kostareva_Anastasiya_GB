<template>
  <div class="showArea">
    <button @click="clickAndShow">{{ textForButton }}</button>
  </div>
</template>
<script>
export default {
  name: "ShowFormButton",
  props: ["visible"],
  data() {
    return {
      textForButton: "ADD NEW COST+",
    };
  },
  methods: {
    clickAndShow: function () {
      this.$emit("clicked");
      if (this.visible === true) {
        this.textForButton = "ADD NEW COST+";
      } else {
        this.textForButton = "CLOSE FORM";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  width: 20%;
}
</style>