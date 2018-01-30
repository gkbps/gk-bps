export function standardApprovalItems (state: any = [], {type, payload}) {
    switch (type) {
        case 'LOAD_STANDARD_APPROVAL_ITEMS':
            return payload;

        default:
            return state;
    }
}
