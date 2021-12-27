export type APIStatementType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  statementDate: string;
  value: number;
  comments: string[];
  status: 'NOT_PAID' | 'PAID';
  statementType: {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    type: 'CREDIT' | 'DEBIT';
    frequency: 'FIXED' | 'VARIABLE';
  };
};

export type APIBalance = {
  total: number;
  flutuation: number;
};

export type APIChart = {
  title: string;
  total: number;
}[];

export type APIDashboardReponse = {
  chart: APIChart;
  debts: number;
  balance: APIBalance;
  statements: APIStatementType[];
};

export type APIFindByMounthResponse = {
  results: APIStatementType[];
  balance: APIBalance;
};

export type APICreateStatementResponse = {
  results: APIStatementType;
  balance: APIBalance;
};

export type APIUpdateStatementResponse = {
  results: APIStatementType;
  balance: APIBalance;
};

export type APIDeleteStatementResponse = {
  balance: APIBalance;
};

export type APIPostOrPatchStatements = {
  statementType: string;
  statementDate: Date;
  value: number;
  comments?: string[];
};
