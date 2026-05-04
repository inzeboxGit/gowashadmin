import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createBootstrap } from 'bootstrap-vue-next'
import VueApexCharts from "vue3-apexcharts";
import { MaskInput } from "vue-mask-next";
import { QuillEditor } from '@vueup/vue-quill';
import flatPickr from 'vue-flatpickr-component';
import PDF from 'pdf-vue3';
import SimpleTypeahead from 'vue3-simple-typeahead';

import '~/assets/scss/app.scss'

import App from './app.vue'
import router from './router'
import { getFirebaseAnalytics } from '~/lib/firebase/app'

const app = createApp(App)

const pinia = createPinia().use(piniaPluginPersistedstate)

app.use(pinia)
app.use(createBootstrap())
app.use(router)
app.component('VueApexCharts', VueApexCharts);
app.component("MaskInput", MaskInput);
app.component('QuillEditor', QuillEditor)
app.component('FlatPickr', flatPickr);
app.component('PDF', PDF);
app.component('SimpleTypeahead', SimpleTypeahead);

getFirebaseAnalytics()

app.mount('#app')
