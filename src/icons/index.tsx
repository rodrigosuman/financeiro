import React from 'react';
import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp';

interface Props {
  size?: number;
}

const icons = {
  CREDIT: (props?: Props) => <ArrowUp {...props} />,
  DEBIT: (props?: Props) => <ArrowDown {...props} />,
};

export default icons;
