export type Book = {
  id: number;
  title: string;
  author: string;
  series: string | null;
  description: string;
  is_queer: boolean;
  cover: string;
  genres: string[];
  approved: boolean;
  createdAt: string;
  characters?: any[];
};

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any) => JSX.Element | string;
};
