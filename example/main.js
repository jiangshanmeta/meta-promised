import Vue from "vue"

import app from "./app.vue"
import metaPromised from "src/index.js"

Vue.component('meta-promised',metaPromised);

new Vue({
    el:"#app",
    render(h){
        return h(app);
    },
    components:{
        app
    },
})