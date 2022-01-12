type Frequency = 'REPEAT_EVERY_15_DAYS' | 'REPEAT_MONTHLY' | 'REPEAT_QUARTERLY' | 'REPEAT_ANNUALLY';

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
  estimate: number;
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
  statement: {
    statementType: string;
    statementDate: string;
    value: number;
    comments?: string[];
    id?: string;
    frequency?: Frequency;
    customValues?: any;
  };
  frequency?: Frequency;
  customValues?: any;
};

export type APIStatementTypes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  type: 'CREDIT' | 'DEBT';
  frequency: 'FIXED' | 'VARIABLE';
  isCard: boolean;
};

export type APICreateStatementRequest = {
  statementType: string;
  statementDate: Date | string;
  value: number;
  comments?: string[];
  status?: 'NOT_PAID' | 'PAID';
  frequency?: Frequency;
  customValues?: { value: number; statementDate: string }[];
};

export type APIPatchStatementRequest = {
  statementType: string;
  statementDate: Date | string;
  value: number;
  comments?: string[];
  id: string;
  status?: 'NOT_PAID' | 'PAID';
};

export type APICopyStatements = {
  statements: APICreateStatementRequest[];
  year: number;
};

export type APIUpdateCreditCards = {
  statementType: string;
  firstIstallment: string;
  totalValue: number;
  installments: number;
  isTotalValue?: boolean;
};

// @ts-ignore
export interface APIPatchStatements extends Partial<APIStatementType> {
  id: string;
  statementType?: string;
}

export interface APIPatchStatementsBody {
  statements: APIPatchStatements[];
}
