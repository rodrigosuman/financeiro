import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Loading from '../../atoms/Loading/Loading';
import StatementItem from '../StatementItem';
import * as S from './styles';
import { StatementsListProps } from './types';

const StatementsList: React.FC<StatementsListProps> = props => {
  const { title, statements, isLoading, onItemPress } = props;
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={statements}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onItemPress ? () => onItemPress?.(item) : undefined}>
              <StatementItem itemProps={item} />
            </TouchableOpacity>
          )}
          keyExtractor={() => Math.random().toString()}
          ListEmptyComponent={() => (
            <S.EmptyText>Nenhum lançamento no período</S.EmptyText>
          )}
        />
      )}
    </S.Container>
  );
};

export default StatementsList;
