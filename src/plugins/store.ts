import { createStore } from "vuex";

import storeHome from "@/store/home";

export default createStore({
  modules: {
    home: storeHome
  }
})