const state = {
    dashboardData: '',
    incomingProduct: '',
    incomingProductName: '',
    incomingProductNameDetail: '',
    outgoingProduct: '',
    returProduct: '',
    warehouseIncome: '',
};

const getters = {
    getSubmenu: state => state.dashboardData.sub_menus,
    getIncomingProduct: state => state.incomingProduct,
    getIncomingProductName: state => state.incomingProductName,
    getIncomingProductNameDetail: state => state.incomingProductNameDetail,
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
    SET_INCOMING_PRODUCT_NAME : (state, payload) => {
        state.incomingProductName = payload;
    },
    SET_INCOMING_PRODUCT_NAME_DETAIL : (state, payload) => {
        state.incomingProductNameDetail = payload;
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
    handleIncomingProductName: (context, payload) => {
        context.commit('SET_INCOMING_PRODUCT_NAME', payload);
    },
    handleIncomingProductNameDetail: (context, payload) => {
        context.commit('SET_INCOMING_PRODUCT_NAME_DETAIL', payload);
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