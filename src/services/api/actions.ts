import api from '.';
import ApiRoutes from '../../constants/apiRoutes';
import {
  APICopyStatements,
  APICreateStatementResponse,
  APIDashboardReponse,
  APIFindByMounthResponse,
  APIPatchStatementsBody,
  APIPostOrPatchStatements,
  APIStatementTypes,
  APIUpdateCreditCards,
  APIUpdateStatementResponse
} from '../../types';

export const getDashboard = () => {
  return api.get<APIDashboardReponse>(ApiRoutes.DASHBOARD);
};

export const getStatementsByMounth = (year: number, mounth: number) => {
  return api.get<APIFindByMounthResponse>(ApiRoutes.FIND_BY_MOUNTH, {
    params: {
      year,
      mounth,
    },
  });
};

export const postStatements = (body: APIPostOrPatchStatements) => {
  return api.post<APICreateStatementResponse>(ApiRoutes.STATEMENTS, body);
};

export const patchStatements = (body: APIPatchStatementsBody) => {
  return api.patch<APIUpdateStatementResponse>(ApiRoutes.STATEMENTS, body);
};

export const deleteStatements = (ids: string[]) => {
  return api.delete<APIUpdateStatementResponse>(ApiRoutes.STATEMENTS, {
    data: {
      ids,
    },
  });
};

export const getStatementTypes = () => {
  return api.get<APIStatementTypes[]>(ApiRoutes.STATEMENT_TYPES);
};

export const postCopyStatements = (body: APICopyStatements) => {
  return api.post<APIUpdateStatementResponse>(ApiRoutes.COPY_STATEMENTS, body);
};

export const postUpdateCreditCards = (body: APIUpdateCreditCards) => {
  return api.post<APIUpdateStatementResponse>(ApiRoutes.UPDATE_CREDIT_CARDS, body);
};
