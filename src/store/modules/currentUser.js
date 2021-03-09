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
        localStorage.setItem('userRole', payload.user.id_cms_privileges);
        localStorage.setItem('userName', payload.user.name);
        // console.log(localStorage.access_token);
    },
    AFTER_LOGOUT: (state) => {
        state.userData = '';
        localStorage.removeItem('access_token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
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