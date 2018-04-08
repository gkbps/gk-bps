import { initialState } from '../initial.state';
import { TopNotificationsActionTypes, NotificationsActionTypes, NotificationActionTypes } from './notifications.actions';

export function TopNotificationsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS:
    case TopNotificationsActionTypes.ADD_NOTIFICATION:
      return Object.assign({}, state, {pending: true, error: null});

    case TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    /**
    *
    */
    case TopNotificationsActionTypes.ADD_NOTIFICATION_SUCCESS:
      // console.log(payload);

      if (state.data['total'] >= 5) {
        state.data['data'].pop();
      }
      state.data['data'].unshift(payload);

      // const listAfterUpload = [...state.data['data'], payload];
      const listAfterUpload = [...state.data['data']];
      const countAfterUpload = state.data['total'] + 1;

      // console.log(listAfterUpload, countAfterUpload);
      return Object.assign({}, state, {data: {
          data: listAfterUpload,
          total: countAfterUpload
        }, pending: false});

    case TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS_ERROR:
    case TopNotificationsActionTypes.ADD_NOTIFICATION_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function NotificationsReducers( state = initialState, { type, payload }) {
  switch (type) {
    case NotificationsActionTypes.GET_NOTIFICATIONS:
    case NotificationsActionTypes.MARK_NOTIFICATION:
    case NotificationsActionTypes.DELETE_NOTIFICATION:
      return Object.assign({}, state, {pending: true, error: null});

    case NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case NotificationsActionTypes.MARK_NOTIFICATION_SUCCESS:
    case NotificationsActionTypes.UNMARK_NOTIFICATION_SUCCESS:
      // console.log(payload);
      // console.log(state);
      const listAfterModified = state.data['data'].map(requestDocument => {
        return requestDocument._id === payload._id ? Object.assign({}, requestDocument, payload) : requestDocument;
      });
      // console.log(listAfterModified);
      return Object.assign(
        {},
        state,
        { data: {
          data: listAfterModified,
          total: state.data['total']
        },
        pending: false
      });

    case NotificationsActionTypes.DELETE_NOTIFICATION_SUCCESS:
      // console.log(payload);
      const listAfterDeleted = state.data['data'].filter(requestDocument => {
        return requestDocument._id !== payload._id;
      });
      // console.log(listAfterDeleted);
      return Object.assign(
        {},
        state,
        { data: {
            data: listAfterDeleted,
            total: (state.data['total'] - 1)
        },
        pending: false
      });

    case NotificationsActionTypes.GET_NOTIFICATIONS_ERROR:
    case NotificationsActionTypes.MARK_NOTIFICATION_ERROR:
    case NotificationsActionTypes.UNMARK_NOTIFICATION_ERROR:
    case NotificationsActionTypes.DELETE_NOTIFICATION_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}

export function NotificationReducers( state = initialState, { type, payload }) {
  switch (type) {
    case NotificationActionTypes.GET_NOTIFICATION:
      return Object.assign({}, state, {pending: true, error: null});

    case NotificationActionTypes.GET_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});

    case NotificationActionTypes.GET_NOTIFICATION_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});

    default:
      return state;
  }
}
