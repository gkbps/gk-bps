export function datasource (state: any = [], {type, payload}) {
    switch (type) {
      case 'GET_DATASOURCE':
          return payload;

      case 'GET_DATASOURCE_STATUS':
          return payload;

      case 'GET_DATASOURCE_CATEGORY':
          return payload;

      case 'GET_DATASOURCE_CATEGORY_STATUS':
          return payload;

      default:
          return state;
    }
}
