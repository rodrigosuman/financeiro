import styled, { css } from 'styled-components/native';
import StrongText from '../../components/atoms/StrongText';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 0;
`;

export const CardText = styled(StrongText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-align: center;
  `}
`;

export const DashboardSection = styled.View`
  margin-bottom: 20px;
`;