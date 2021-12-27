export type ItemStatus = 'NOT_PAID' | 'PAID';

export type ItemType = 'CREDIT' | 'DEBIT';

export interface StatemetItemProps {
  onPress?: (statementItem: any) => void;
  itemProps: {
    title: string;
    value: number;
    status: ItemStatus;
    type: ItemType;
    statamenteDate: Date;
  };
}
