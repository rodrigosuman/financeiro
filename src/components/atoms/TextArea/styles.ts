import styled, { css } from 'styled-components/native';
import FontName from '../../../constants/fontNames';
import DefaultText from '../DefaultText';

export const Container = styled.View`
  ${({ theme }) => css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.white};
    background-color: ${theme.colors.white}10;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-left: -8px;
    margin-right: -8px;
  `}
`;

export const ValueWrapper = styled.View`
  flex: 1;
`;

export const ValueText = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;

export const TextArea = styled.TextInput`
  ${({ theme }) => css`
    font-family: ${FontName.REGULAR};
    color: ${theme.colors.white};
    font-size: 16px;
    padding: 0;
  `}
`;
