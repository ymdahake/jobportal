export interface Column {
  id: 'jobId' | 'title' | 'company' | 'description' | 'location'|'remote' |'level'|'hrEmail'| 'dateOfPosting'|'postedBy';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  hide?:boolean;
  
}