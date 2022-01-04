import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import useSelector from '../../../hooks/useSelector';
import Checkbox from '../../atoms/Checkbox';
import { CheckboxRef } from '../../atoms/Checkbox/types';
import Loading from '../../atoms/Loading/Loading';
import StatementItemComponent from '../StatementItem';
import { StatementItem } from '../StatementItem/types';
import * as S from './styles';
import { StatementsListProps } from './types';

interface ItemProps {
  onItemPress?: (statement: StatementItem) => void;
  multSelect?: boolean;
  onCheckPress?: (checked: boolean, statement: StatementItem) => void;
  item: StatementItem;
}

const Item: React.FC<ItemProps> = props => {
  const multSelectedStatements = useSelector(state => state.statements.multSelectedStatements);

  const { onItemPress, multSelect, item, onCheckPress } = props;

  const checkboxRef = React.useRef<CheckboxRef>({ toggleChecked: () => {} });

  const _onCheckPress = React.useCallback(
    (value: boolean, item: StatementItem) => {
      onCheckPress?.(value, item);
    },
    [onCheckPress],
  );

  const handleContainerPress = React.useCallback(
    (item: StatementItem) => {
      if (multSelect) {
        return () => {
          _onCheckPress(false, item);
          checkboxRef.current.toggleChecked?.();
        };
      }

      if (onItemPress) {
        return () => {
          onItemPress?.(item);
        };
      }

      return undefined;
    },
    [_onCheckPress, multSelect, onItemPress],
  );

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleContainerPress(item)}>
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
  );
};

const StatementsList: React.FC<StatementsListProps> = props => {
  const { title, statements, isLoading, onItemPress, multSelect = false, onCheckPress } = props;

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
            <Item item={item} multSelect={multSelect} onCheckPress={_onCheckPress} onItemPress={onItemPress} />
          )}
          keyExtractor={() => Math.random().toString()}
          ListEmptyComponent={() => <S.EmptyText>Nenhum lançamento no período</S.EmptyText>}
        />
      )}
    </S.Container>
  );
};

export default StatementsList;
