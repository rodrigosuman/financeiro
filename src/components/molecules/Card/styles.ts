import styled, { css } from 'styled-components/native';
import TitleTwo from '../../atoms/TitleTwo';
import { CardVariant } from './types';

interface ContainerProps {
  variant?: CardVariant;
  light?: boolean;
}

export const Container = styled.View<ContainerProps>`
  ${({ theme, variant, light = false }) => css`
    padding: 8px;
    background-color: ${variant ? theme.colors[variant] : theme.colors.bgLight}${light ? 50 : ''};
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
