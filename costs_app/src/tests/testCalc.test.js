import { mount } from "@vue/test-utils";
import CalcComponent from "../components/CalcComponent.vue";

describe('Test Calc', () => {
    it('Test first operand input', () => {
        const wrapper = mount(CalcComponent);
        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('1');
        expect(wrapper.vm.operand1).toBe(1);
    });
    it('Test second operand input', () => {
        const wrapper = mount(CalcComponent);
        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "1";
        operand2.trigger('input');
        expect(wrapper.vm.operand2).toBe(1);
    });
    it('Test summ', () => {
        const wrapper = mount(CalcComponent);

        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "2";
        operand2.trigger('input');

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('3');

        const btn = wrapper.find('button[title="+"]');
        btn.trigger('click')


        expect(wrapper.vm.result).toBe(5);
    });
});
