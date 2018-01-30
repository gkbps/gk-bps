export function apiGkUsers (state: any = [], {type, payload}) {
    switch (type) {
        case 'LOAD_API_PAGINATED_GKUSERS':
            return payload;

        default:
            return state;
    }
}
