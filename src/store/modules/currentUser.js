const state = {
    userData: [],
};

const getters = {
    userData: state => state.userData,
};

const mutations = {
    AFTER_LOGIN : (state, payload) => {
        state.userData.push(payload);
    },
    AFTER_LOGOUT: (state) => {
        state.userData = [];
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