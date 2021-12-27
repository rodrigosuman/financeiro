import styled, { css } from 'styled-components/native';
import DefaultText from '../../atoms/DefaultText';
import SmallText from '../../atoms/SmallText';

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.white}09;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 5px 10px;
  `}
`;

export const MounthTitle = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    text-transform: uppercase;
  `}
`;

export const YearText = styled(SmallText)`
  ${({ theme }) => css`
    color: ${theme.colors.secondary}90;
    text-align: center;
    margin-top: -8px;
  `}
`;

export const MounthTitleWrapper = styled.View``;
