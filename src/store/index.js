import { createStore } from 'vuex';
import coachModule from './modules/coaches/index.js';
import requestsMod from './modules/requests/index.js';
import authMod from './modules/auth/index.js';
const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestsMod,
    authMod
  }
});
export default store;
