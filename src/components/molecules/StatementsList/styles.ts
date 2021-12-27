import styled, { css } from 'styled-components/native';
import DefaultText from '../../atoms/DefaultText';
import TitleTwo from '../../atoms/TitleTwo';

export const Container = styled.View`
  flex: 1;
  padding: 0 8px;
`;

export const Title = styled(TitleTwo)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-bottom: 16px;
  `}
`;

export const EmptyText = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.white}90;
    text-align: center;
    margin-top: 16px;
  `}
`;
