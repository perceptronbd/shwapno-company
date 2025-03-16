export interface Branch {
  id: string;
  name: string;
  location: string;
  companyId: string;
  qrURL: string | null;
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchQRPayload {
  branchId: string;
}