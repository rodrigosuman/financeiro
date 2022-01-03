import styled, { css } from 'styled-components/native';
import StrongText from '../../components/atoms/StrongText';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 0;
`;

export const ContainerSection = styled.View`
  margin-bottom: 20px;
`;

export const EstimateBalanceView = styled.View`
  /* flex-direction: row; */
`;

export const EstimateBalanceViewItem = styled.View`
  flex: 1;
`;

export const CardText = styled(StrongText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-align: center;
  `}
`;
