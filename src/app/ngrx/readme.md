NGRX: Store for APP
- Plural: ModulesActionTypes
- Single: ModuleActionTypes
- verb = get, reset, add, save, delete

/
| initial.state.ts        Define initial state for store, including { data, pending and error }
|
/ modules/
  | modules.models.ts      Include all data model interfaces
  |
  | modules.actions.ts    Define all action types, naming:  ...ActionTypes
  |                       Include all actions for store, naming: verb...Action"
  |
  | modules.reducers.ts   Include pure functions serve as reducer for store, naming: ...Reducers
  |
  | modules.effects.ts    Middleware to map action with service for store data, naming:...Effects
  |                       Include all effects for store, naming: verb...
  |
  | modules.services.ts   Include services to communicate with API server, naming by nature
|
| comsumer/
  | consumer.module.ts    Declare store and effects module, and export services
  |                       Import: StoreModule, EffectsModule, ...Reducers, ...Effects, ...Services
  |                       imports
  |                       - StoreModule.forRoot({...Reducers})
  |                       - EffectsModule.forRoot([...Effects]);
  |
  |                       - StoreModule.forFeature('...', ...Reducers)
  |                       - EffectsModule.forFeature([...Effects]);
  |
  |                       providers: [...Services]
  |
  | consumer.component.ts The place where action to be dispatched to store
  |                       Import: Store, verb...Action
  |
  |                       Consuming:
  |                       - store.dispatch(verb...Action());
  |                       - ... = store.select('...');
  |
  |                       Pass ... from smart component to dumb component
  |                       - {{...|async}}
  |
  |                       Handle passed ... at dumb component
  |                       - Change data change detection strategy:
  |                         changeDetection: ChangeDetectionStrategy.OnPush
  |
  |                       - ...(.pending)     Pending request
  |                       - ...(.data)        Success
  |                       - ...(.error)       Error
  |
