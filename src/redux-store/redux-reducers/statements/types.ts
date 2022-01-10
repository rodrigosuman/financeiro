import { APIBalance, APIStatementType } from '../../../types';

export type StatementsState = {
  data: APIStatementType[];
  balance: APIBalance;
  isLoading: boolean;
  isSending?: boolean;
  isSendingMultSelect?: boolean;
  isMultSelect?: boolean;
  multSelectedStatements: APIStatementType[];
  pagination: {
    year: number;
    mounth: number;
  };
};
