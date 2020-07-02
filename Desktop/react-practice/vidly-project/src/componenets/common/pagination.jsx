import React, { Component } from "react";
import PropTypes from "prop-types";
const _ = require("lodash");
class Pagination extends Component {
  state = {
    itemsCount: this.props.itemsCount,
    pageSize: this.props.pageSize,
  };
  render() {
    // console.log(this.props.currentPage);
    const pageNumber = this.state.itemsCount / this.state.pageSize;
    if (pageNumber <= 1) return null;
    // console.log(pageNumber);
    const pages = _.range(1, pageNumber + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === this.props.currentPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                href="#"
                onClick={() => this.props.onPageChange(page)}
                className="page-link active"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
