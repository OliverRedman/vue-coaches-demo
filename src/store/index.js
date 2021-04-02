import { createStore } from 'vuex';
import coachModule from './modules/coaches/index.js';
import requestsMod from './modules/requests/index.js';
const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestsMod
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});
export default store;
