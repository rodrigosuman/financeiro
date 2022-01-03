import styled, { css } from 'styled-components/native';
import DefaultText from '../../atoms/DefaultText';
import SmallText from '../../atoms/SmallText';

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.bgLight}50;
    width: 100%;

    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  `}
`;

export const HandlersWrapper = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
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
    margin-top: -4px;
  `}
`;

export const MounthTitleWrapper = styled.View``;

export const IconWrapper = styled.View`
  ${({ theme }) => css`
    width: 48px;
    height: 48px;
    background-color: ${theme.colors.white}09;
    justify-content: center;
    align-items: center;
  `}
`;
