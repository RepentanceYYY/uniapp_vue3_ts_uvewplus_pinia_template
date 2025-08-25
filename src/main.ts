import { createSSRApp } from "vue";
import App from "./App.vue";
import uViewPlus from "uview-plus";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
export const createApp = () => {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(uViewPlus).use(pinia);
  return {
    app,
    pinia,
  };
};
