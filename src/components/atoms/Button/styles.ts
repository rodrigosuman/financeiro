import styled, { css } from 'styled-components/native';
import StrongText from '../StrongText/StrongText';
import { ButtonVariant } from './types';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  ${({ theme, variant }) => css`
    background-color: ${theme.colors[variant]};
    height: 60px;
    justify-content: center;
    align-items: center;
  `}
`;

export const ButtonTitle = styled(StrongText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;
