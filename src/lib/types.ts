export const STATUSES = [
  'saved',
  'applied',
  'assessment',
  'interview',
  'offer',
  'rejected',
  'withdrawn',
] as const;

export type ApplicationStatus = (typeof STATUSES)[number];

export type Application = {
  id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  source: string;
  location: string;
  notes: string;
  createdAt: number;
  updatedAt: number;
};

export type ApplicationInput = Omit<Application, 'id' | 'createdAt' | 'updatedAt'>;

export type Reminder = {
  id: number;
  applicationId: number;
  title: string;
  dueAt: number;
  completed: boolean;
};

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  saved: 'Disimpan',
  applied: 'Dilamar',
  assessment: 'Assessment',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Ditolak',
  withdrawn: 'Mengundurkan diri',
};
