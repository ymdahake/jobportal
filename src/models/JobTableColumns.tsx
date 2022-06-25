export interface Column {
    id: 'jobTitle' | 'city' | 'domain' | 'email' | 'publishedDate'|'entryLevel';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }