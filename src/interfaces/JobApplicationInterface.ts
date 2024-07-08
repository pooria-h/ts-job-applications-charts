type HadInterviewType = 0 | 1;

export interface JobApplicationInterface {
  id: string;
  companyName: string;
  applyDate: string;
  status: string; // applied, rejected, accepted, etc
  rejectionReason: string; // if status is rejected
  hadInterview: HadInterviewType;
  businessType: string; // product, service, etc
  country: string; // city, state
  workspaceType?: string; // remote, office, hybrid
  details?: string; // job description
}
