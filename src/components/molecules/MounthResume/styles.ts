import styled, { css } from 'styled-components/native';
import FontName from '../../../constants/fontNames';
import { ThemeColor } from '../../../styles';
import SmallText from '../../atoms/SmallText';

export const Container = styled.View`
  margin-top: 14px;
`;

export const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface ItemText {
  color?: keyof ThemeColor;
}

export const ItemText = styled(SmallText)<ItemText>`
  ${({ theme, color = 'secondary' }) => css`
    color: ${theme.colors[color]};
    margin-bottom: 2px;
  `}
`;

export const BalanceWrapper = styled(ItemWrapper)`
  ${({ theme }) => css`
    border-top-width: 1px;
    border-color: ${theme.colors.secondary}50;
    margin-top: 8px;
    padding-top: 8px;
  `}
`;

export const BalanceText = styled(ItemText)`
  ${() => css`
    font-family: ${FontName.SEMI_BOLD};
  `}
`;
