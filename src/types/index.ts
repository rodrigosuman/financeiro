export type APIStatementType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  statementDate: string;
  value: number;
  comments: string[];
  status: 'NOT_PAID' | 'PAID';
  statementType: APIStatementTypes;
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
  statementDate: string;
  value: number;
  comments?: string[];
  id?: string;
};

export type APIStatementTypes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  type: 'CREDIT' | 'DEBT';
  frequency: 'FIXED' | 'VARIABLE';
};

export type APICreateStatementRequest = {
  statementType: string;
  statementDate: Date | string;
  value: number;
  comments?: string[];
};

export type APIPatchStatementRequest = {
  statementType: string;
  statementDate: Date | string;
  value: number;
  comments?: string[];
  id: string;
  status?: 'NOT_PAID' | 'PAID';
};
