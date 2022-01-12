import styled, { css } from 'styled-components/native';
import DefaultText from '../DefaultText';

export const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Container = styled.View`
  ${({ theme }) => css`
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background-color: ${theme.colors.white}20;
    justify-content: center;
    align-items: center;
  `}
`;

export const Label = styled(DefaultText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-left: 10px;
  `}
`;
