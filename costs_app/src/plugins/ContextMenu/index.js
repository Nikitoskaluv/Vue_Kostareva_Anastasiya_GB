export default {
    install(Vue) {
        if (this.installed) {
            return;
        }

        this.installed = true;


        Vue.prototype.$ctxMenu = {
            EventBus: new Vue(),

            show(item, pos) {
                this.EventBus.$emit('show', item, pos);
            },
            hide() {
                this.EventBus.$emit('hide');
            }
        };
    }
};