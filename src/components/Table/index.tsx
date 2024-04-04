import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { TableColumnsType, TableProps } from "antd";

import { IProduct } from "../../interfaces/Product";
import { TableParams } from "../../interfaces/ITableParams";
import { useHistory } from "react-router-dom";

interface TableComponentProps {
  products: IProduct[];
  changePage: (TableParams: any) => void;
  totalItens: number;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  products,
  changePage,
  totalItens,
}) => {
  const history = useHistory();

  const columns: TableColumnsType<IProduct> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item: IProduct) => (
        <Button onClick={() => history.push(`/products/${item.id}`)}>
          Edit
        </Button>
      ),
    },
  ];

  const [pagination, setPagination] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      pagination: {
        ...prevPagination.pagination,
        total: totalItens,
      },
    }));
  }, [totalItens]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setPagination({
      pagination,
      filters,

      ...sorter,
    });

    changePage(pagination);
  };

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={products}
        pagination={pagination.pagination}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
};
