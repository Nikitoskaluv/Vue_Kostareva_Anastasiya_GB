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
    it('Test minus', () => {
        const wrapper = mount(CalcComponent);

        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "2";
        operand2.trigger('input');

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('3');

        const btn = wrapper.find('button[title="-"]');
        btn.trigger('click')


        expect(wrapper.vm.result).toBe(1);
    });
    it('Test divide', () => {
        const wrapper = mount(CalcComponent);

        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "2";
        operand2.trigger('input');

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('6');

        const btn = wrapper.find('button[title="/"]');
        btn.trigger('click')


        expect(wrapper.vm.result).toBe(3);
    });
    it('Test multiply', () => {
        const wrapper = mount(CalcComponent);

        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "2";
        operand2.trigger('input');

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('6');

        const btn = wrapper.find('button[title="*"]');
        btn.trigger('click')


        expect(wrapper.vm.result).toBe(12);
    });
    it('Test exponent', () => {
        const wrapper = mount(CalcComponent);

        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "3";
        operand2.trigger('input');

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('2');

        const btn = wrapper.find('button[title="^"]');
        btn.trigger('click')


        expect(wrapper.vm.result).toBe(8);
    });

    it('Test divide/0', () => {
        const wrapper = mount(CalcComponent);


        const operand2 = wrapper.find('input[name=operand2]');
        operand2.element.value = "0";
        operand2.trigger('input');

        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('2');

        const btn = wrapper.find('button[title="/"]');
        btn.trigger('click');

        expect(wrapper.vm.error).toBe("На ноль делить нельзя");

    });
    it('Test backSpace', () => {
        const wrapper = mount(CalcComponent);
        const backspaceKey = wrapper.find("button[name=backspace]");
        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue(222);
        const radio1 = wrapper.find("#radio1");
        radio1.setChecked();
        backspaceKey.trigger('click');
        expect(wrapper.vm.operand1).toBe(22);
    });
    it('Test backSpace', () => {
        const wrapper = mount(CalcComponent);
        const backspaceKey = wrapper.find("button[name=backspace]");
        const operand2 = wrapper.find('input[name=operand2]');
        operand2.setValue(222);
        const radio2 = wrapper.find("#radio2");
        radio2.setChecked();
        backspaceKey.trigger('click');
        expect(wrapper.vm.operand2).toBe(22);
    }),

        it('Test key1', () => {
            const wrapper = mount(CalcComponent);
            const operand1 = wrapper.find('input[name=operand1]');
            const radio1 = wrapper.find("#radio1");
            radio1.setChecked();
            const firstKey = wrapper.find("button[value='1']");
            firstKey.trigger('click');
            expect(wrapper.vm.operand1).toBe(1);
        });
    it('Test key1', () => {
        const wrapper = mount(CalcComponent);
        const operand2 = wrapper.find('input[name=operand2]');
        const radio2 = wrapper.find("#radio2");
        radio2.setChecked();
        const firstKey = wrapper.find("button[value='1']");
        firstKey.trigger('click');
        expect(wrapper.vm.operand2).toBe(1);
    });
    it('Test model2', () => {
        const wrapper = mount(CalcComponent);
        const operand2 = wrapper.find('input[name=operand2]');
        operand2.setValue(222);
        expect(wrapper.vm.$data.operand2).toBe(222);
    });
    it('Test model1', () => {
        const wrapper = mount(CalcComponent);
        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue(222);
        expect(wrapper.vm.$data.operand1).toBe(222);
    });
    it('Test notShowKeybord', () => {
        const wrapper = mount(CalcComponent);
        expect(wrapper.find('.keypad').isVisible()).toBe(false);
    });
    it('Test showKeyboard', () => {
        const wrapper = mount(CalcComponent);

        const checkboxInput = wrapper.find('input[type=checkbox]');
        checkboxInput.setChecked();
        // wrapper.setData({ isChecked: true });
        expect(wrapper.find('.keypad').isVisible());
    });
});
