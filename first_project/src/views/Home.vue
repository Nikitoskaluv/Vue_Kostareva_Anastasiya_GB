<template>
  <div class="home">
    <input v-model.number="operand1" type="number" />
    <input v-model.number="operand2" type="number" />
    = {{ result }}
    <br />
    <button @click="plusFunction(operand1, operand2)">+</button>
    <button @click="minusFunction(operand1, operand2)">-</button>
    <button @click="divideFunction(operand1, operand2)">/</button>
    <button @click="multiplyFunction(operand1, operand2)">*</button>
    <button @click="exponentFunction(operand1, operand2)">^</button>
    <p id="error" v-if="visible">На ноль делить нельзя</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
      visible: false,
    };
  },
  methods: {
    plusFunction(opr1, opr2) {
      this.result = opr1 + opr2;
    },
    minusFunction(opr1, opr2) {
      this.result = opr1 - opr2;
    },
    divideFunction(opr1, opr2) {
      if (opr2 === 0) {
        this.visible = true;
        this.isDisabled = true;
        return;
      }
      this.result = opr1 / opr2;
    },
    multiplyFunction(opr1, opr2) {
      this.result = opr1 * opr2;
    },
    exponentFunction(opr1, opr2) {
      this.result = Math.pow(opr1, opr2);
    },
  },
};
</script>
<style scooped>
</style>
