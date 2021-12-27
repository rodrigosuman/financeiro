import styled, { css } from 'styled-components/native';
import DefaultText from '../../atoms/DefaultText';
import SmallText from '../../atoms/SmallText';
import { ItemStatus } from './types';

export const Container = styled.TouchableOpacity<{ status: ItemStatus }>`
  ${({ status }) => css`
    opacity: ${status === 'PAID' ? 1 : 0.25};
  `}
`;

export const ItemHeader = styled.View`
  ${() => css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const TitleWrapper = styled.View`
  ${() => css`
    flex-direction: row;
    align-items: center;
  `}
`;

export const IconWrapper = styled.View`
  margin-right: 10px;
  margin-top: -4px;
`;

export const StatementDateWrapper = styled.View`
  ${() => css`
    flex-direction: row;
    justify-content: flex-end;
  `}
`;

export const ItemTitle = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;

export const StatementDateText = styled(SmallText)`
  ${({ theme }) => css`
    color: ${theme.colors.white}50;
  `}
`;
