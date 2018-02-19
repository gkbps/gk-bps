export function paginatedDashboardPages (state: any = [], {type, payload}) {
    switch (type) {
      case 'GET_DASHBOARD_PAGES':
          return payload;

      default:
          return state;
    }
}

export function selectedDashboardPage (state: any = [], {type, payload}) {
    switch (type) {
      case 'GET_DASHBOARD_PAGES':
          return payload;

      default:
          return state;
    }
}

export function dashboardItems (state: any = [], {type, payload}) {
    switch (type) {
      case 'GET_DASHBOARD_ITEMS':
          return payload;

      default:
          return state;
    }
}

export function selectedDashboardItem (state: any = [], {type, payload}) {
    switch (type) {
      case 'GET_DASHBOARD_ITEMS':
          return payload;

      default:
          return state;
    }
}
