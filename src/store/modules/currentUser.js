const state = {
    userData: '',
};

const getters = {
    userData: state => state.userData,
    userToken: state => state.userData.access_token,
};

const mutations = {
    AFTER_LOGIN : (state, payload) => {
        state.userData = payload;
        localStorage.setItem('access_token', payload.access_token);
        console.log(localStorage.access_token);
    },
    AFTER_LOGOUT: (state) => {
        state.userData = '';
        localStorage.removeItem('access_token');
    }
};

const actions = {
    afterLogin: (context, payload) => {
        context.commit('AFTER_LOGIN', payload);
    },

    afterLogout: context => context.commit('AFTER_LOGOUT')
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}