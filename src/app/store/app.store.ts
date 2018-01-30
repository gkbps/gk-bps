import { GkUser } from './_models/gkUser.model';
import { GkRequest } from './_models/gkRequest.model';
import { GkClient } from './_models/gkClient.model';
import { ApprovalItem } from './_models/approvalItem.model';
import { RequestFile } from './_models/requestFile.model';

export interface AppStore {
  apiGkUsers: GkUser[];

  paginatedGkRequests: GkRequest[];
  apiGkRequests: GkRequest[];
  gkRequests: GkRequest[];
  selectedGkRequest: GkRequest;

  paginatedGkClients: GkClient[];
  apiGkClients: GkClient[];
  gkClients: GkClient[];
  selectedGkClient: GkClient;

  standardApprovalItems: ApprovalItem[];

  requestFiles: RequestFile[];

}
