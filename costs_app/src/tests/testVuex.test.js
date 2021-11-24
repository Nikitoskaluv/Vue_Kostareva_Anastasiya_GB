import 'regenerator-runtime/runtime';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TestVuex from './TestVuex.vue';
import Vuex from 'vuex';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('TestVuex', () => {
    let store
    let actions
    beforeEach(() => {
        actions = {
            addData: jest.fn()
        }
        store = new Vuex.Store({
            state: {
                data: '0'
            },
            actions
        });
    });


    it('run action addData', async () => {
        const wrapper = shallowMount(TestVuex, {
            store, localVue
        })
        const input = wrapper.find('input');
        input.setValue('123');

        const btn = wrapper.find('button');
        await btn.trigger('click');
        expect(actions.addData).toHaveBeenCalled();
    });
});


