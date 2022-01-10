import styled, { css } from 'styled-components/native';
import SmallText from '../../components/atoms/SmallText';
import StrongText from '../../components/atoms/StrongText';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 0;
`;

export const ContainerSection = styled.View`
  margin-bottom: 20px;
`;

export const EstimateBalanceView = styled.View`
  /* flex-direction: row; */
`;

export const EstimateBalanceViewItem = styled.View`
  flex: 1;
`;

export const CardText = styled(StrongText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-align: center;
    height: 30px;
  `}
`;

export const UpdateCreditCardButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary}10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 30px;
    border-radius: 30px;
    padding: 0 12px;
  `}
`;

export const UpdateCardButtonText = styled(SmallText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 12px;
    margin-left: 10px;
  `}
`;
