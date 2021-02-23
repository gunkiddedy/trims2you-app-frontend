const state = {
    keyword: '',
};

const getters = {
    get_keyword: (state) => {
        return state.keyword
    },
};

const mutations = {
    SEARCH_PROJECTS: (state, payload) => {
       state.keyword = payload;
    },
};

const actions = {
    handleSearchProducts: (context, payload) => {
        context.commit('SEARCH_PROJECTS', payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}