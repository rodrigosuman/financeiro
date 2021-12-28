export type StatementFormData = {
  value: string;
  statementType: string;
  statementDate: string;
  frequency?: string;
};

export interface StatementCreateEditFormProps {
  statementDate: Date;
}

export interface StatementCreateEditFormRef {
  setInitialData: (data: StatementFormData) => void;
}
