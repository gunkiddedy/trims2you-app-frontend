const state = {
    data: '',
};

const getters = {
    getSubmenu: state => state.data.sub_menus,
};

const mutations = {
    SET_WAREHOUSE_DATA : (state, payload) => {
        state.data = payload;
    },
};

const actions = {
    handleWarehouse: (context, payload) => {
        context.commit('SET_WAREHOUSE_DATA', payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}