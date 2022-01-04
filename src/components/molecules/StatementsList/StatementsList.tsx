import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import useSelector from '../../../hooks/useSelector';
import Checkbox from '../../atoms/Checkbox';
import Loading from '../../atoms/Loading/Loading';
import StatementItemComponent from '../StatementItem';
import { StatementItem } from '../StatementItem/types';
import * as S from './styles';
import { StatementsListProps } from './types';

const StatementsList: React.FC<StatementsListProps> = props => {
  const { title, statements, isLoading, onItemPress, multSelect = false, onCheckPress } = props;

  const multSelectedStatements = useSelector(state => state.statements.multSelectedStatements);

  const _onCheckPress = React.useCallback(
    (value: boolean, item: StatementItem) => {
      onCheckPress?.(value, item);
    },
    [onCheckPress],
  );

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
              onPress={onItemPress ? () => onItemPress?.(item) : undefined}
              disabled={multSelect}>
              <S.ItemContainer>
                {multSelect && (
                  <View style={{ marginRight: 8 }}>
                    <Checkbox
                      onValue={value => _onCheckPress?.(value, item)}
                      initalValue={!!multSelectedStatements.find?.(statementItem => statementItem.id === item.id)?.id}
                    />
                  </View>
                )}
                <StatementItemComponent itemProps={item} multSelect={multSelect} />
              </S.ItemContainer>
            </TouchableOpacity>
          )}
          keyExtractor={() => Math.random().toString()}
          ListEmptyComponent={() => <S.EmptyText>Nenhum lançamento no período</S.EmptyText>}
        />
      )}
    </S.Container>
  );
};

export default StatementsList;
