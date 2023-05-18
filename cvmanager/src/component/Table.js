import React from "react";
import DataTable from "react-data-table-component";
const Table = (props) => {
  const { ...rest } = props;
  return <DataTable {...rest} />;
};

export default Table;
