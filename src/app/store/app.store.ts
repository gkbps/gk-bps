/*******************************************************************************
 * COMMON STORE
 * - Request
 * -
 * - Dashboard
 * - Other commnons
 ******************************************************************************/

// Request
import { GkRequest } from './_models/gkRequest.model';

// Datasource
import { Datasource } from './_models/datasource.model';

// Dashboard
import { DashboardPage } from './_models/dashboard.model';
import { DashboardItem } from './_models/dashboard.model';


import { GkUser } from './_models/gkUser.model';

import { GkClient } from './_models/gkClient.model';
import { ApprovalItem } from './_models/approvalItem.model';
import { RequestFile } from './_models/requestFile.model';

import { Dashboard } from './_models/dashboard.model';





export interface AppStore {

  // Dashboard
  paginatedDashboardPages: DashboardPage[];
  selectedDashboardPage: DashboardPage;

  dashboardItems: DashboardItem[];
  selectedDashboardItem: DashboardItem;

  // Requests
  paginatedGkRequests: GkRequest[];
  apiGkRequests: GkRequest[];
  // gkRequests: GkRequest[];
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
