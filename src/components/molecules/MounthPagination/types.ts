interface PaginationArgs {
  year: number;
  mounth: number;
}

export interface MounthPaginationProps {
  onPaginate: (args: PaginationArgs) => void;
}
