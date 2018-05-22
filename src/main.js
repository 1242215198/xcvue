import Vue from 'vue';
import VueRouter from 'vue-router';
import LoadingBar from './components/loading-bar';
import routes from './router';
import App from './app.vue';
import 'normalize.css';
import './index.less';
import './assets/iconfonts/iconfont.css';

import utils from '@/libs/common';
import respont from '@/libs/axios';

Vue.prototype.$utils = utils;
Vue.prototype.$http = respont;

Vue.config.productionTip = false;
// 路由配置
const RouterConfig = {
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }
    }
};
const router = new VueRouter(RouterConfig);
Vue.use(VueRouter);
Vue.use(LoadingBar);
router.beforeEach((to, from, next) => {
    LoadingBar.start();
    utils.setTitle(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    LoadingBar.finish();
    window.scrollTo(0, 0);
});
new Vue({
    el: '#desktop',
    router,
    template: '<App/>',
    components: {App}
})