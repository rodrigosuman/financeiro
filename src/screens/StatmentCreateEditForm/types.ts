export type StatementFormData = {
  value: string;
  statementType: string;
  statementDate: string;
  frequency?:
    | 'REPEAT_EVERY_15_DAYS'
    | 'REPEAT_MONTHLY'
    | 'REPEAT_QUARTERLY'
    | 'REPEAT_ANNUALLY';
  id?: string;
  status?: 'PAID' | 'NOT_PAID';
  customValues?: { value: number; statementDate: string }[];
};

export interface StatementCreateEditFormProps {
  statementDate: Date;
}

export interface StatementCreateEditFormRef {
  setInitialData: (data: StatementFormData) => void;
}
