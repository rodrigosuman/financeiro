export type FrequencyType =
  | 'REPEAT_EVERY_15_DAYS'
  | 'REPEAT_MONTHLY'
  | 'REPEAT_QUARTERLY'
  | 'REPEAT_ANNUALLY'
  | 'CUSTOM';

interface StatementFrequency {
  title: string;
  value: FrequencyType;
}

const statementFrequency: StatementFrequency[] = [
  {
    title: 'A cada 15 dias',
    value: 'REPEAT_EVERY_15_DAYS',
  },
  {
    title: 'Mensalmente',
    value: 'REPEAT_MONTHLY',
  },
  {
    title: 'A cada 3 meses',
    value: 'REPEAT_QUARTERLY',
  },
  {
    title: 'Anualmente',
    value: 'REPEAT_ANNUALLY',
  },
  {
    title: 'Personalizada',
    value: 'CUSTOM',
  },
];

export default statementFrequency;
