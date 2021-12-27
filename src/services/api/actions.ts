import api from '.';
import ApiRoutes from '../../constants/apiRoutes';
import {
  APICreateStatementResponse,
  APIDashboardReponse,
  APIFindByMounthResponse,
  APIPostOrPatchStatements,
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

export const patchStatements = (
  statementId: string,
  body: Partial<APIPostOrPatchStatements>,
) => {
  return api.patch<APIUpdateStatementResponse>(
    ApiRoutes.STATEMENTS + '/' + statementId,
    body,
  );
};

export const deleteStatements = (statementId: string) => {
  return api.delete<APIUpdateStatementResponse>(
    ApiRoutes.STATEMENTS + '/' + statementId,
  );
};
