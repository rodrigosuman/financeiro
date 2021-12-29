export type StatementFormData = {
  value: string;
  statementType: string;
  statementDate: string;
  frequency?: string;
  id?: string;
  status?: 'PAID' | 'NOT_PAID';
};

export interface StatementCreateEditFormProps {
  statementDate: Date;
}

export interface StatementCreateEditFormRef {
  setInitialData: (data: StatementFormData) => void;
}
