import styled, { css } from 'styled-components/native';
import DefaultText from '../../atoms/DefaultText';

export const Container = styled.View`
  background-color: #00000099;
  justify-content: flex-end;
  flex: 1;
`;

export const ModalContent = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.bgDark};
    min-height: 40%;
  `}
`;

export const ModalContentHeader = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 8px;
`;

export const DeleteText = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.error};
  `}
`;
