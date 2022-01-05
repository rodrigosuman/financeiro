import styled, { css } from 'styled-components/native';
import StrongText from '../../atoms/StrongText';

export const Container = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.View`
  ${({ theme }) => css`
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: ${theme.colors.white}40;
    position: absolute;
    top: -2px;
    right: -2px;
  `}
`;

export const DotText = styled(StrongText)`
  ${({ theme }) => css`
    font-size: 12px;
    color: ${theme.colors.white};
    align-self: center;
  `}
`;
