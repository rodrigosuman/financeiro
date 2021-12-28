import React from 'react';
import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import Calendar from './Calendar';
import ChevronDown from './ChevronDown';
import Close from './Close';
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
  CHEVRON_DOWN: (props?: Props) => <ChevronDown {...props} />,
  CALENDAR: (props?: Props) => <Calendar {...props} />,
  CLOSE: (props?: Props) => <Close {...props} />,
};

export default icons;
