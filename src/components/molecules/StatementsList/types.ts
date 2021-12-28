import { StatementItem } from '../StatementItem/types';

export interface StatementsListProps {
  title?: string;
  statements: StatementItem[];
  isLoading?: boolean;
  onItemPress?: (statement: StatementItem) => void;
}
