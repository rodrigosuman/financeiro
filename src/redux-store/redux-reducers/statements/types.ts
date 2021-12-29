import { APIBalance, APIStatementType } from '../../../types';

export type StatementsState = {
  data?: APIStatementType[];
  balance: APIBalance;
  isLoading: boolean;
  isSending?: boolean;
};
