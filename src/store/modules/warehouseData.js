const state = {
    dashboardData: '',
    incomingProduct: '',
    outgoingProduct: '',
    returProduct: '',
    warehouseIncome: '',
};

const getters = {
    getSubmenu: state => state.dashboardData.sub_menus,
    getIncomingProduct: state => state.incomingProduct,
    getOutgoingProduct: state => state.outgoingProduct,
    getReturProduct: state => state.returProduct,
    getWarehouseIncome: state => state.warehouseIncome,
};

const mutations = {
    SET_DASHBOARD_DATA : (state, payload) => {
        state.dashboardData = payload;
    },
    SET_INCOMING_DATA : (state, payload) => {
        state.incomingProduct = payload;
    },
    SET_OUTGOING_DATA : (state, payload) => {
        state.outgoingProduct = payload;
    },
    SET_RETUR_DATA : (state, payload) => {
        state.returProduct = payload;
    },
    SET_WAREHOUSE_INCOME_DATA : (state, payload) => {
        state.warehouseIncome = payload;
    },
};

const actions = {
    handleDashboard: (context, payload) => {
        context.commit('SET_DASHBOARD_DATA', payload);
    },
    handleIncoming: (context, payload) => {
        context.commit('SET_INCOMING_DATA', payload);
    },
    handleOutgoing: (context, payload) => {
        context.commit('SET_OUTGOING_DATA', payload);
    },
    handleRetur: (context, payload) => {
        context.commit('SET_RETUR_DATA', payload);
    },
    handleWarehouseIncome: (context, payload) => {
        context.commit('SET_WAREHOUSE_INCOME_DATA', payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}