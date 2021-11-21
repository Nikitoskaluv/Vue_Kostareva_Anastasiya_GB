<template>
  <div>The message is : {{ message }}</div>
</template>
<script>
export default {
  name: "TestComponenet",
  props: {
    message: String,
  },
};
</script>
<style lang="scss">
</style>