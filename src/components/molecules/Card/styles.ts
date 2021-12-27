import styled, { css } from 'styled-components/native';
import TitleTwo from '../../atoms/TitleTwo';
import { CardVariant } from './types';

interface ContainerProps {
  variant?: CardVariant;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, variant }) => css`
    padding: 8px;
    background-color: ${variant ? theme.colors[variant] : theme.colors.bgLight};
  `}
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardContent = styled.View``;

export const CardTitle = styled(TitleTwo)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
`;
