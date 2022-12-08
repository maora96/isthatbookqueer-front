import { Table } from "antd";
import { Book, Column } from "../../types";
// import { Column, TableData } from "types";
import styles from "./styles.module.scss";

interface IDataTable {
  data: Book[];
  columns: Column[];
  total?: number;
  onChangePage: (page: number) => void;
  rowSelection?: {
    onChange: (selectedRowKeys: any, selectedRows: any) => void;
    getCheckboxProps: (record: any) => any;
  };
}

export function DataTable({
  data,
  columns,
  total,
  onChangePage,
  rowSelection,
}: IDataTable) {
  return (
    <Table
      dataSource={data}
      columns={columns}
      className={styles.container}
      pagination={{ total: total }}
      onChange={(pagination) => {
        const page = pagination.current;
        if (page) {
          onChangePage(page);
        }
      }}
      data-testid="table"
    />
  );
}
