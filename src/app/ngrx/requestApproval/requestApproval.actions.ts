/**
* REQUEST APPROVAL
* @enum {RequestApprovalActionTypes}
* @function getRequestApprovalAction
*/

export enum RequestApprovalActionTypes {
  // ApprovalItems
  GET_MANY_REQUEST_APPROVAL = '[Request Approval] Get Many Request Approval',
  GET_MANY_REQUEST_APPROVAL_SUCCESS = '[Request Approval] Get Many Request Approval Success',
  GET_MANY_REQUEST_APPROVAL_ERROR = '[Request Approval] Get Many Request Approval Error',
}

export function getRequestApprovalAction(tcode) {
  return {
    type: RequestApprovalActionTypes.GET_MANY_REQUEST_APPROVAL,
    payload: {
      tcode: tcode,
    }
  };
}
