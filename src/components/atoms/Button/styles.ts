import styled, { css } from 'styled-components/native';
import StrongText from '../StrongText/StrongText';
import { ButtonVariant } from './types';

interface ButtonContainerProps {
  variant: ButtonVariant;
  isSending?: boolean;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
  ${({ theme, variant, isSending }) => css`
    background-color: ${!isSending ? theme.colors[variant] : '#BAB4C170'};
    height: 60px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `}
`;

export const ButtonTitle = styled(StrongText)<{ isSending?: boolean }>`
  ${({ theme, isSending }) => css`
    color: ${theme.colors.white};
  `}
`;
