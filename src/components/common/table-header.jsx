import React, { Component } from 'react';


class TableHeader extends Component {
  styles = { cursor: 'pointer' }

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>

    return <i className="fa fa-sort-desc"></i>
  }

  render() {
    const { columns } = this.props;

    return (
      <thead style={ this.styles }>
        <tr>
          { columns.map(c =>
            <th
                key={c.path || c.key}
                onClick={ () => this.raiseSort(c.path) }>
                { c.label } { this.renderSortIcon(c) }
            </th>
          )}
        </tr>
      </thead>
    )
  }
}

export default TableHeader;
