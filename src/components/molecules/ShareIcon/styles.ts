import styled, { css } from 'styled-components/native';
import StrongText from '../../atoms/StrongText';

export const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.View`
  ${({ theme }) => css`
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: ${theme.colors.secondary};
    position: absolute;
    top: 0px;
    right: 0px;
  `}
`;

export const DotText = styled(StrongText)`
  ${({ theme }) => css`
    font-size: 12px;
    color: ${theme.colors.primary};
    align-self: center;
  `}
`;
