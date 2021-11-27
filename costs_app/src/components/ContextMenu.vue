<template>
  <div class="wrapper" :style="{ top: pos.y + 'px', left: pos.x + 'px' }">
    <div @click="onEdit">Редактировать</div>
    <div @click="onDelete">Удалить</div>
  </div>
</template>
<script>
export default {
  name: "ContextMenu",
  props: {
    item: Object,
    pos: Object,
  },
  methods: {
    onDelete() {
      this.$store.commit("deletePaymentData", this.item);
      this.$ctxMenu.hide();
    },
    onEdit() {
      this.$modal.show("payment", {
        title: "Изменение платежа",
        content: "AddPaymentForm",
        data: this.item,
      });
      this.$ctxMenu.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  padding: 5px;
  max-width: 200px;
  background: white;
  box-shadow: 0 0 3px 1px rgb(71, 71, 71);
  div {
    border-bottom: 1px solid #444;
    cursor: pointer;
  }
}
</style>
