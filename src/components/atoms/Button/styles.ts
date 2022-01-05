import styled, { css } from 'styled-components/native';
import StrongText from '../StrongText/StrongText';
import { ButtonSize, ButtonVariant } from './types';

interface ButtonContainerProps {
  variant: ButtonVariant;
  isSending?: boolean;
  size?: ButtonSize;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  ${({ theme, variant, isSending, size }) => css`
    background-color: ${!isSending ? theme.colors[variant] : '#BAB4C170'};
    height: ${size === 'SMALL' ? 40 : 60}px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `}
`;

export const ButtonTitle = styled(StrongText)<{ isSending?: boolean; size?: ButtonSize }>`
  ${({ theme, size }) => css`
    color: ${theme.colors.white};
    font-size: ${size === 'SMALL' ? 14 : 16}px;
  `}
`;
