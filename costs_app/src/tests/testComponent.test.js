import { mount } from '@vue/test-utils';
import TestComponet from './TestComponent.vue';

describe('TestComponenet', () => {
    test('Content from Props', () => {
        const wrapper = mount(TestComponet, {
            propsData: {
                message: "Hello from test!"
            }
        });
        expect(wrapper.text()).toEqual('The message is : Hello from test!');
    });
});