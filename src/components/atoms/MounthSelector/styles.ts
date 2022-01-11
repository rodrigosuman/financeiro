import styled, { css } from 'styled-components/native';
import DefaultText from '../DefaultText';

export const Container = styled.TouchableOpacity`
  ${({ theme }) => css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.white};
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
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
