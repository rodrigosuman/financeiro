export type UpdateCardsFormData = {
  statementType: string;
  firstIstallment: Date;
  totalValue: number;
  installments: number;
};

export interface UpdateCardsFormProps {
  statementDate: Date;
}

export interface UpdateCardsFormRef {
  setInitialData: (data: UpdateCardsFormData) => void;
}
