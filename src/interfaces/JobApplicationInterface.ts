type HadInterviewType = 0 | 1;

export interface JobApplicationInterface {
  id: string;
  companyName: string;
  applyDate: string;
  status: string;
  rejectionReason: string;
  hadInterview: HadInterviewType;
  businessType: string;
  country: string;
  workspaceType?: string;
  details?: string;
}
