import React, { Component } from "react";
class genreList extends Component {
  render() {
    const {
      items,
      textProprty,
      valueProperty,
      onItemSelect,
      currentItem,
    } = this.props;
    return (
      <ul className="list-group col-lg-2 m-3">
        {items.map((item) => (
          <li
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              item[textProprty] === currentItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProprty]}
          </li>
        ))}
      </ul>
    );
  }
}
genreList.defaultProps = {
  textProprty: "name",
  valueProperty: "_id",
};
export default genreList;
