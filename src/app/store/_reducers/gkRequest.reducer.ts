export function paginatedGkRequests (state: any = [], {type, payload}) {
    switch (type) {
        case 'PAGINATE_GKREQUESTS':
            return payload;

        default:
            return state;
    }
}

export function apiGkRequests (state: any = [], {type, payload}) {
    switch (type) {
        case 'LOAD_API_GKREQUEST':
            return payload;

        default:
            return state;
    }
}

export function gkRequests (state: any = [], {type, payload}) {
    switch (type) {
        case 'NEW_GKREQUEST':
            return payload;

        // case 'CREATE_GKREQUEST':
        //     return [...state, payload];

        // case 'UPDATE_GKREQUEST':
        //     return state.map(gkRequest => {
        //         return gkRequest.token === payload.token ? Object.assign({}, gkRequest, payload) : gkRequest;
        //     });

        // case 'DELETE_GKREQUEST':
        //     return state.filter(gkRequest => {
        //         return gkRequest.token !== payload.token;
        //     });

        default:
            return state;
    }
}

export function selectedGkRequest (state: any = [], {type, payload}) {
    switch (type) {
        case 'SELECT_GKREQUEST':
            return payload;

        case 'CREATE_NEW_GKREQUEST':
            return payload;

        case 'UPDATE_GKREQUEST':
            return payload;

        case 'CREATE_CHANGE_GKREQUEST':
            return payload;

        case 'SUBMIT_GKREQUEST':
            return payload;

        case 'GENERATE_APPROVAL_FLOW_GKREQUEST':
            return payload;

        case 'WITHDRAW_GKREQUEST':
            return payload;

        case 'CANCEL_GKREQUEST':
            return payload;

        case 'RETURN_GKREQUEST':
            return payload;

        case 'REJECT_GKREQUEST':
            return payload;

        case 'APPROVE_GKREQUEST':
            return payload;

        case 'ABORT_GKREQUEST':
            return payload;

        default:
            return state;
    }
}
