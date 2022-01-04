import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background-color: ${theme.colors.white}20;
    justify-content: center;
    align-items: center;
  `}
`;
