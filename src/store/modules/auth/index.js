export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-IWvSDku1jsc-5Pe2waL97_v6Zhb9pOE';
      if (mode === 'signup') {
        this.url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-IWvSDku1jsc-5Pe2waL97_v6Zhb9pOE';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || 'Wrong login data.');
        throw error;
      }

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expireIn
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId,
          tokenExpiration: null
        });
      }
    },
    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null
      });
    },

    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      });
    }
  }
};
