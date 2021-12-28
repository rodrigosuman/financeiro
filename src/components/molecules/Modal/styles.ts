import styled, { css } from 'styled-components/native';
import { KeyOfThemeColor } from '../../../styles';
import DefaultText from '../../atoms/DefaultText';

export const Container = styled.View`
  background-color: #00000099;
  justify-content: flex-end;
  flex: 1;
`;

export const ModalContent = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.bgDark};
    min-height: 350px;
    max-height: 80%;
    padding-top: 24px;
  `}
`;

export const ModalContentHeader = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 8px;
`;

export const DeleteText = styled(DefaultText)<{ variant?: KeyOfThemeColor }>`
  ${({ theme, variant = 'error' }) => css`
    color: ${theme.colors[variant]};
  `}
`;
