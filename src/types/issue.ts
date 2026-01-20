export type Issue = {       
  label: string;     
  content: string;    
  type: IssueType;
}

export enum IssueType {
  Error = 'error',
  Warning = 'warning',
  Bug = 'bug',
  Info = 'info',
}

