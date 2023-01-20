export enum EnglishLevel {
  NO_ENGLISH = 'No English',
  PRE_INTERMEDIATE = 'Pre-Intermediate',
  INTERMEDIATE = 'Intermediate',
  UPPER_INTERMEDIATE = 'Upper-Intermediate',
}

export enum Role {
  FREELANCER = 'Freelancer',
  JOBOWNER = 'JobOwner',
}

export enum AvailableTime {
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
}

export enum DurationAmount {
  MONTH = 'Month',
  WEEK = 'Week',
}

export enum RequestType {
  PROPOSAL = 'Proposal',
  INTERVIEW = 'Interview',
}

export enum OfferStatus {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  PENDING = 'Pending',
}

export enum ContractStatus {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
}

export enum JobStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'InProgress',
  FINISHED = 'Finished',
}

export const coverLetterMaxLength = 1000;
export const conversationMessageMaxLength = 1000;
export const jobDescriptionMaxLength = 1000;
export const ratingMessageMaxLength = 1000;
