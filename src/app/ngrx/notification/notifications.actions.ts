/**
 * NOTIFICATIONS
 */

 export enum TopNotificationsActionTypes {
   GET_TOP_NOTIFICATIONS = '[Notification] Get Top Notifications',
   GET_TOP_NOTIFICATIONS_SUCCESS = '[Notification] Get Top Notifications Success',
   GET_TOP_NOTIFICATIONS_ERROR = '[Notification] Get Top Notifications Error',

   ADD_NOTIFICATION = '[Notification] Add Notification',
   ADD_NOTIFICATION_SUCCESS = '[Notification] Add Notification Success',
   ADD_NOTIFICATION_ERROR = '[Notification] Add Notification Error',
 }

 export function getTopNotificationsAction(filter, sort, first, rows) {
   // Return an action with type and payload
   return {
     type: TopNotificationsActionTypes.GET_TOP_NOTIFICATIONS,
     payload: {
       filter: filter,
       sort: sort,
       first: first,
       rows: rows
     }
   };
 }

 export function addNotificationAction(notification) {
   // console.log(notification);
   return {
     type: TopNotificationsActionTypes.ADD_NOTIFICATION,
     payload: { notification: notification }
   };
 }

export enum NotificationsActionTypes {
  GET_NOTIFICATIONS = '[Notification] Get Many Notifications',
  GET_NOTIFICATIONS_SUCCESS = '[Notification] Get Many Notifications Success',
  GET_NOTIFICATIONS_ERROR = '[Notification] Get Many Notifications Error',

  MARK_NOTIFICATION = '[Notification] Mark Notification',
  MARK_NOTIFICATION_SUCCESS = '[Notification] Mark Notification Success',
  MARK_NOTIFICATION_ERROR = '[Notification] Mark Notification Error',

  UNMARK_NOTIFICATION = '[Notification] Unmark Notification',
  UNMARK_NOTIFICATION_SUCCESS = '[Notification] Unmark Notification Success',
  UNMARK_NOTIFICATION_ERROR = '[Notification] Unmark Notification Error',

  DELETE_NOTIFICATION = '[Notification] Delete Notification',
  DELETE_NOTIFICATION_SUCCESS = '[Notification] Delete Notification Success',
  DELETE_NOTIFICATION_ERROR = '[Notification] Delete Notification Error',
}

/**
* @function getNotificationsAction
* get Notifications
*/
export function getNotificationsAction(filter, sort, first, rows) {
  // Return an action with type and payload
  return {
    type: NotificationsActionTypes.GET_NOTIFICATIONS,
    payload: {
      filter: filter,
      sort: sort,
      first: first,
      rows: rows
    }
  };
}

export function markNotificationAction(id) {
  return {
    type: NotificationsActionTypes.MARK_NOTIFICATION,
    payload: { id: id }
  };
}

export function unmarkNotificationAction(id) {
  return {
    type: NotificationsActionTypes.UNMARK_NOTIFICATION,
    payload: { id: id }
  };
}

export function deleteNotificationAction(id) {
  return {
    type: NotificationsActionTypes.DELETE_NOTIFICATION,
    payload: { id: id }
  };
}

/**
 * NOTIFICATION
 */

export enum NotificationActionTypes {
  GET_NOTIFICATION = '[Notification] Get Notification',
  GET_NOTIFICATION_SUCCESS = '[Notification] Get Notification Success',
  GET_NOTIFICATION_ERROR = '[Notification] Get Notification Error',
}

export function getNotificationAction(id) {
  return {
    type: NotificationActionTypes.GET_NOTIFICATION,
    payload: { id: id }
  };
}
