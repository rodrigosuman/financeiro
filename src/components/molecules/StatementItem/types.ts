export type ItemStatus = 'NOT_PAID' | 'PAID';

export type ItemType = 'CREDIT' | 'DEBT';

export interface StatementItem {
  title: string;
  value: number;
  status: ItemStatus;
  type: ItemType;
  statamenteDate: Date;
  id: string;
}

export interface StatemetItemProps {
  onPress?: (statementItem: any) => void;
  itemProps: StatementItem;
}
