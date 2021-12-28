import styled, { css } from 'styled-components/native';
import StrongText from '../../components/atoms/StrongText';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px 0;
`;

export const ContainerSection = styled.View`
  margin-bottom: 20px;
`;

export const CardText = styled(StrongText)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-align: center;
  `}
`;

export const FormContainer = styled.View`
  justify-content: space-between;
  flex-direction: column;
  height: 500px;
`;

export const FormInputsContainer = styled.View`
  padding: 40px 10px;
`;

export const FormItem = styled.View`
  margin-bottom: 60px;
`;
