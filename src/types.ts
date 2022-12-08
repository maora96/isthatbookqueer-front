export type Book = {
  id: number;
  title: string;
  author: string;
  series: string | null;
  description: string;
  is_queer: boolean;
  queer_data: string | null;
  cover: string;
  genres: string[];
  approved: boolean;
  created_at: string;
};

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any) => JSX.Element | string;
};
