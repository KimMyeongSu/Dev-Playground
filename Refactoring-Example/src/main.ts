import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import "@/assets/css/reset.css";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import App from "./App.vue";

// FontAwesome 설정
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

library.add(faSpinner);

const app = createApp(App);
const head = createHead();
app.use(pinia);
app.use(router);
app.use(VueTailwindDatepicker);
app.use(head);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
