import React from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';

const Table = ({ sortColumn, onSort, data, columns }) => {
    return (
      <table className="table">
          <TableHeader
            sortColumn={ sortColumn }
            onSort={ onSort }
            columns={ columns }/>
          <TableBody data={ data } columns={ columns }/>
      </table>
    )
}

export default Table;
