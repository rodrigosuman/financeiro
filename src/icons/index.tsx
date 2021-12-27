import React from 'react';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import Filter from './Filter';

interface Props {
  size?: number;
  color?: string;
}

const icons = {
  CREDIT: (props?: Props) => <ArrowUp {...props} />,
  DEBT: (props?: Props) => <ArrowDown {...props} />,
  FILTER: (props?: Props) => <Filter {...props} />,
  ARROW_LEFT: (props?: Props) => <ArrowLeft {...props} />,
  ARROW_RIGHT: (props?: Props) => <ArrowRight {...props} />,
};

export default icons;
