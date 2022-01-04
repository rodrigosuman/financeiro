import { StatementItem } from '../StatementItem/types';

export interface StatementsListProps {
  title?: string;
  statements: StatementItem[];
  isLoading?: boolean;
  onItemPress?: (statement: StatementItem) => void;
  multSelect?: boolean;
  onCheckPress?: (checked: boolean, statement: StatementItem) => void;
}
