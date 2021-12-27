import styled, { css } from 'styled-components/native';
import SmallText from '../../atoms/SmallText';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  margin-top: -3px;
`;

export const FlutuationText = styled(SmallText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-right: 4px;
  `}
`;
