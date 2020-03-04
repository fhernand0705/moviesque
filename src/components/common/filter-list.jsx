import React from 'react';

const FilterList = ({ items,
                      textProp,
                      valueProp,
                      onItemSelect,
                      selectedItem }) => {

  return (
    <ul className="list-group">
      { items.map(item =>
        <li key={ item[valueProp] }
          className={ selectedItem === item ? 'list-group-item active' : 'list-group-item' }
          onClick={ () => onItemSelect(item) }>
          { item[textProp] }
        </li>
      )}
    </ul>
  )
}

FilterList.defaultProps = {
  textProp: 'name',
  valueProp: '_id'
}

export default FilterList;
