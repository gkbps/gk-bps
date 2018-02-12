import { GkUser } from './_models/gkUser.model';
import { GkRequest } from './_models/gkRequest.model';
import { GkClient } from './_models/gkClient.model';
import { ApprovalItem } from './_models/approvalItem.model';
import { RequestFile } from './_models/requestFile.model';

import { Dashboard } from './_models/dashboard.model';
import { Datasource } from './_models/datasource.model';

export interface AppStore {

  // Requests
  paginatedGkRequests: GkRequest[];
  apiGkRequests: GkRequest[];
  gkRequests: GkRequest[];
  selectedGkRequest: GkRequest;

  // Module: GkClient
  paginatedGkClients: GkClient[];
  apiGkClients: GkClient[];
  gkClients: GkClient[];
  selectedGkClient: GkClient;

  paginatedGkClientsDashboard: Dashboard[];
  selectedGkClientDashboard: Dashboard;

  // Others
  standardApprovalItems: ApprovalItem[];

  requestFiles: RequestFile[];

  // Datasource for creating dashboard item
  datasource: Datasource[];

  // APIs
  apiGkUsers: GkUser[];
}
