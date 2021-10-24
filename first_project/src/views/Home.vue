<template>
  <div class="home">
    <input v-model.number="operand1" type="number" />
    <input v-model.number="operand2" type="number" />
    = {{ result }}
    <br />

    <button
      v-for="(operator, idx) in operators"
      :key="idx"
      :title="operator"
      @click="calculate(operator)"
    >
      {{ operator }}
    </button>

    <div class="error" v-if="error">{{ error }}</div>
    <br />
    <input type="checkbox" id="checkbox" v-model="isChecked" />
    <label for="checkbox">Отобразить клавиатуру</label>
    <div class="keypad" v-show="isChecked">
      <button
        v-for="keyButton in keysCollection"
        :key="keyButton"
        :value="keyButton"
        @click="getNumber($event)"
      >
        {{ keyButton }}
      </button>
      <button v-html="backSpace" @click="deleteNumber()">
        {{ backSpace }}
      </button>
      <br />

      <input
        type="radio"
        v-model="choose"
        name="radioChoose"
        value="operand1"
      />
      <label for="firstInput">Первый операнд</label>
      <input
        type="radio"
        v-model="choose"
        name="radioChoose"
        value="operand2"
      />
      <label for="secondInput">Второй операнд</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      operators: ["+", "-", "/", "*", "^"],
      result: 0,
      error: "",
      keysCollection: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      backSpace: "&#8592",
      isChecked: false,
      choose: "",
    };
  },
  methods: {
    getNumber(event) {
      if (this.choose === "operand1") {
        this.operand1 += event.target.value;
        this.operand1 = parseInt(this.operand1);
      } else if (this.choose === "operand2") {
        this.operand2 += event.target.value;
        this.operand2 = parseInt(this.operand2);
      }
    },
    calculateOperand(text) {
      return parseInt(text.length > 1 ? text.slice(0, -1) : 0);
    },

    deleteNumber() {
      if (this.choose === "operand1") {
        this.operand1 = this.calculateOperand(String(this.operand1));
      } else if (this.choose === "operand2") {
        this.operand2 = this.calculateOperand(String(this.operand2));
      }
    },

    calculate(operation = "+") {
      this.error = "";
      switch (operation) {
        case "+":
          this.plusFunction();
          break;
        case "-":
          this.minusFunction();
          break;
        case "/":
          this.divideFunction();
          break;
        case "*":
          this.multiplyFunction();
          break;
        case "^":
          this.exponentFunction();
          break;
      }
    },
    showKeybord() {
      this.isChecked ? (this.showKeybord = true) : (this.showKeybord = false);
    },
    plusFunction() {
      this.result = this.operand1 + this.operand2;
    },
    minusFunction() {
      this.result = this.operand1 - this.operand2;
    },
    divideFunction() {
      let { operand2 } = this;
      if (operand2 === 0) {
        this.error = "На ноль делить нельзя";
        return;
      }
      this.result = this.operand1 / this.operand2;
      this.error = "";
    },
    multiplyFunction() {
      this.result = this.operand1 * this.operand2;
    },
    exponentFunction() {
      this.result = Math.pow(this.operand1, this.operand2);
    },
  },
};
</script>
<style scooped>
</style>
