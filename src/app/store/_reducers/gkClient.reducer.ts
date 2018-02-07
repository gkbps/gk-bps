export function paginatedGkClients (state: any = [], {type, payload}) {
    switch (type) {
        case 'PAGINATE_GKCLIENTS':
            return payload;

        default:
            return state;
    }
}

export function paginatedGkClientsDashboard (state: any = [], {type, payload}) {
    switch (type) {
        case 'PAGINATE_GKCLIENTS_DASHBOARD':
            return payload;

        default:
            return state;
    }
}

export function apiGkClients (state: any = [], {type, payload}) {
    switch (type) {
        case 'LOAD_API_GKCLIENT':
            return payload;

        default:
            return state;
    }
}

export function gkClients (state: any = [], {type, payload}) {
    switch (type) {
        case 'NEW_GKCLIENT':
            return payload;

        // case 'CREATE_GKCLIENT':
        //     return [...state, payload];

        // case 'UPDATE_GKCLIENT':
        //     return state.map(gkClient => {
        //         return gkClient.token === payload.token ? Object.assign({}, gkClient, payload) : gkClient;
        //     });

        // case 'DELETE_GKCLIENT':
        //     return state.filter(gkClient => {
        //         return gkClient.token !== payload.token;
        //     });

        default:
            return state;
    }
}

export function selectedGkClient (state: any = [], {type, payload}) {
    switch (type) {
        case 'SELECT_GKCLIENT':
            return payload;

        case 'SELECT_GKCLIENT_REQUEST':
            return payload;

        case 'CREATE_GKCLIENT':
            return payload;

        case 'UPDATE_GKCLIENT':
            return payload;

        case 'UPDATE_GKCLIENT_REQUEST':
            return payload;

        case 'DISABLE_GKCLIENT':
            return payload;

        case 'ENABLE_GKCLIENT':
            return payload;

        case 'MARK_GKCLIENT':
            return payload;

        case 'UNMARK_GKCLIENT':
            return payload;

        case 'DELETE_GKCLIENT':
            return payload;

        default:
            return state;
    }
}

export function selectedGkClientDashboard (state: any = [], {type, payload}) {
    switch (type) {
        case 'SELECT_GKCLIENT_DASHBOARD':
            return payload;

        case 'CREATE_GKCLIENT_DASHBOARD':
            return payload;

        case 'UPDATE_GKCLIENT_DASHBOARD':
            return payload;

        case 'DISABLE_GKCLIENT_DASHBOARD':
            return payload;

        case 'ENABLE_GKCLIENT_DASHBOARD':
            return payload;

        case 'MARK_GKCLIENT_DASHBOARD':
            return payload;

        case 'UNMARK_GKCLIENT_DASHBOARD':
            return payload;

        case 'DELETE_GKCLIENT_DASHBOARD':
            return payload;

        default:
            return state;
    }
}
