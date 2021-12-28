import React from 'react';

export interface ModalRefProps {
  toggleVisible: () => void;
}

export interface ModalProps {
  onDelete?: () => void;
  children?: React.ReactNode;
}
