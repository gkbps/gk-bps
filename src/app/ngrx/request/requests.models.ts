export interface Request {
  tcode: string;
  desc: string;
  remark: string;
  status: string;
  step?: string;

  requestor?: {
    fullname: string,
    username: string
  };

  owner?: string[];
  approved?: string[];

  pic?: {
    fullname: string,
    username: string
  };

  planned?: string;
  next?: string[];
  id?: string;
  approval_type?: string;
  approval?: any[];
  docs?: string[];
  created_at?: Date;
  updated_at?: Date;
}
